import { useState, useEffect } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { WeatherCard } from "@/components/WeatherCard";
import { CropRecommendation } from "@/components/CropRecommendation";
import { SoilTest } from "@/components/SoilTest";
import { CropGuide } from "@/components/CropGuide";
import { EditableProfile } from "@/components/EditableProfile";
import { MarketPrices } from "@/components/MarketPrices";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, MapPin, Thermometer } from "lucide-react";

// Mock data - in real app, this would come from APIs
const mockWeatherData = {
  temperature: 28,
  humidity: 65,
  rainfall: 2.5,
  windSpeed: 12,
  condition: "sunny" as const,
  forecast: [
    { day: "Today", temp: 28, condition: "sunny" },
    { day: "Tue", temp: 30, condition: "sunny" },
    { day: "Wed", temp: 26, condition: "rainy" },
    { day: "Thu", temp: 29, condition: "cloudy" },
    { day: "Fri", temp: 31, condition: "sunny" },
    { day: "Sat", temp: 27, condition: "rainy" },
    { day: "Sun", temp: 28, condition: "cloudy" },
  ],
};

const mockCropRecommendations = [
  {
    id: "rice",
    name: "Rice (Kharif)",
    nameTelugu: "వరి (ఖరీఫ్)",
    nameHindi: "चावल (खरीफ)",
    suitabilityScore: 92,
    expectedYield: "4-5 tons/hectare",
    profitPotential: "₹40,000-60,000",
    sowingWindow: "June - July",
    harvestWindow: "October - November",
    icon: "🌾",
    reasons: [
      "Optimal soil pH for rice cultivation",
      "Good monsoon forecast for this season",
      "High market demand expected",
    ],
  },
  {
    id: "cotton",
    name: "Cotton",
    nameTelugu: "పత్తి",
    nameHindi: "कपास",
    suitabilityScore: 78,
    expectedYield: "2-3 tons/hectare",
    profitPotential: "₹35,000-50,000",
    sowingWindow: "May - June",
    harvestWindow: "November - December",
    icon: "🌱",
    reasons: [
      "Suitable soil type for cotton",
      "Good temperature range",
      "Export demand stable",
    ],
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    nameTelugu: "చెరకు",
    nameHindi: "गन्ना",
    suitabilityScore: 71,
    expectedYield: "60-80 tons/hectare",
    profitPotential: "₹50,000-70,000",
    sowingWindow: "February - March",
    harvestWindow: "December - February",
    icon: "🎋",
    reasons: [
      "Long-term crop with good returns",
      "Water availability suitable",
      "Sugar mill contracts available",
    ],
  },
];

export function CropApp() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [activeTab, setActiveTab] = useState("home");
  const [location, setLocation] = useState("Hyderabad, Telangana");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [showCropGuide, setShowCropGuide] = useState(false);
  const [soilData, setSoilData] = useState<any>(null);
  const [farmerProfile, setFarmerProfile] = useState({
    name: "Ravi Kumar",
    location: "Hyderabad, Telangana",
    farmSize: "5",
    irrigation: "drip",
    soilType: "red",
    lastCrop: "Rice",
    experience: "6-10"
  });

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem("preferredLanguage", language);
  };

  const handleCropSelect = (crop: any) => {
    setSelectedCrop(crop);
    setShowCropGuide(true);
  };

  const handleSoilTestClick = () => {
    setActiveTab("soil-test");
  };

  const handleSoilDataUpdate = (data: any) => {
    setSoilData(data);
    // Update location if it comes from soil data
    if (data.location) {
      setLocation(data.location);
    }
  };

  const handleProfileUpdate = (profile: any) => {
    setFarmerProfile(profile);
    setLocation(profile.location);
  };

  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  if (!selectedLanguage) {
    return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
  }

  const getLocalizedText = (en: string, hi: string, te: string) => {
    switch (selectedLanguage) {
      case "hi":
        return hi;
      case "te":
        return te;
      default:
        return en;
    }
  };

  const renderHomeContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">
          {getLocalizedText(
            "🌾 AI Crop Recommender",
            "🌾 AI फसल सुझाव",
            "🌾 AI పంట సిఫార్సు"
          )}
        </h1>
        <p className="text-muted-foreground">
          {getLocalizedText(
            "Smart farming decisions for better yields",
            "बेहतर उत्पादन के लिए स्मार्ट खेती के फैसले",
            "మెరుగైన దిగుబడి కోసం తెలివైన వ్యవసాయ నిర్णయాలు"
          )}
        </p>
      </div>

      {/* Weather Card */}
      <WeatherCard weather={mockWeatherData} location={location} />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card 
          className="p-4 text-center shadow-card hover:shadow-elevated transition-smooth cursor-pointer hover:border-crop-green/30 border-2"
          onClick={handleSoilTestClick}
        >
          <div className="space-y-2">
            <div className="text-2xl">🌡️</div>
            <h3 className="font-semibold text-foreground">Soil Test</h3>
            <p className="text-sm text-muted-foreground">
              {getLocalizedText("Check soil health", "मिट्टी की जांच", "మట్టి పరీక్ష")}
            </p>
            {soilData && (
              <Badge className="bg-crop-green text-white border-0 text-xs">
                {getLocalizedText("Completed", "पूर्ण", "పూర్తి")}
              </Badge>
            )}
          </div>
        </Card>

        <Card 
          className="p-4 text-center shadow-card hover:shadow-elevated transition-smooth cursor-pointer hover:border-crop-green/30 border-2"
          onClick={() => setActiveTab("market")}
        >
          <div className="space-y-2">
            <div className="text-2xl">📊</div>
            <h3 className="font-semibold text-foreground">Market Prices</h3>
            <p className="text-sm text-muted-foreground">
              {getLocalizedText("Current rates", "वर्तमान दरें", "ప్రస్తుత ధరలు")}
            </p>
          </div>
        </Card>
      </div>

      {/* Crop Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            {getLocalizedText("Recommended Crops", "सुझाई गई फसलें", "సిఫార్సు చేసిన పంటలు")}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={isLoading}
            className="border-crop-green text-crop-green hover:bg-crop-light"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            {getLocalizedText("Refresh", "ताज़ा करें", "రిఫ్రెష్")}
          </Button>
        </div>

        <CropRecommendation
          recommendations={mockCropRecommendations}
          language={selectedLanguage}
          onCropSelect={handleCropSelect}
        />
      </div>
    </div>
  );

  const renderContent = () => {
    // Show crop guide if selected
    if (showCropGuide && selectedCrop) {
      return (
        <CropGuide
          crop={selectedCrop}
          language={selectedLanguage}
          onBack={() => {
            setShowCropGuide(false);
            setSelectedCrop(null);
          }}
        />
      );
    }

    switch (activeTab) {
      case "home":
        return renderHomeContent();
      case "weather":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                {getLocalizedText("🌤 Weather Dashboard", "🌤 मौसम डैशबोर्ड", "🌤 వాతావరణ డ్యాష్‌బోర్డ్")}
              </h2>
              <p className="text-muted-foreground">
                {getLocalizedText("Current conditions and forecast", "वर्तमान स्थिति और पूर्वानुमान", "ప్రస్తుత పరిస్థితులు మరియు అంచనా")}
              </p>
            </div>
            <WeatherCard weather={mockWeatherData} location={location} />
            
            {/* Weather insights */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">
                {getLocalizedText("Weather Insights", "मौसम अंतर्दृष्टि", "వాతావరణ అంతర్దృష్టులు")}
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• {getLocalizedText("Good conditions for rice cultivation", "धान की खेती के लिए अच्छी स्थिति", "వరి సాగుకు మంచి పరిస్థితులు")}</li>
                <li>• {getLocalizedText("Expect moderate rainfall this week", "इस सप्ताह मध्यम बारिश की उम्मीद", "ఈ వారం మధ్యస్థ వర్షం అని ఆశిస్తున్నాం")}</li>
                <li>• {getLocalizedText("Ideal temperature for crop growth", "फसल की वृद्धि के लिए आदर्श तापमान", "పంట పెరుగుదలకు అనువైన ఉష్ణోగ్రత")}</li>
              </ul>
            </Card>
          </div>
        );
      case "crops":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                {getLocalizedText("🌾 Crop Recommendations", "🌾 फसल सुझाव", "🌾 పంట సిఫార్సులు")}
              </h2>
              <p className="text-muted-foreground">
                {getLocalizedText("AI-powered suggestions for your farm", "आपके खेत के लिए AI-संचालित सुझाव", "మీ వ్యవసాయానికి AI ఆధారిత సలహాలు")}
              </p>
            </div>
            <CropRecommendation
              recommendations={mockCropRecommendations}
              language={selectedLanguage}
              onCropSelect={handleCropSelect}
            />
          </div>
        );
      case "soil-test":
        return (
          <SoilTest
            location={location}
            onSoilDataUpdate={handleSoilDataUpdate}
            language={selectedLanguage}
          />
        );
      case "market":
        return (
          <MarketPrices
            language={selectedLanguage}
          />
        );
      case "profile":
        return (
          <EditableProfile
            profile={farmerProfile}
            language={selectedLanguage}
            onProfileUpdate={handleProfileUpdate}
          />
        );
      case "settings":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                {getLocalizedText("⚙️ Settings", "⚙️ सेटिंग्स", "⚙️ సెట్టింగ్స్")}
              </h2>
              <p className="text-muted-foreground">
                {getLocalizedText("Customize your app experience", "अपना ऐप अनुभव अनुकूलित करें", "మీ యాప్ అనుభవాన్ని అనుకూలీకరించండి")}
              </p>
            </div>
            
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {getLocalizedText("App Preferences", "ऐप प्राथमिकताएं", "యాప్ ప్రాధాన్యతలు")}
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-foreground mb-2">
                      {getLocalizedText("Language", "भाषा", "భాష")}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedLanguage("")}
                      className="w-full justify-start border-crop-green text-crop-green hover:bg-crop-light"
                    >
                      {getLocalizedText("Change Language", "भाषा बदलें", "భాష మార్చు")}
                    </Button>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">
                      {getLocalizedText("Current Location", "वर्तमान स्थान", "ప్రస్తుత స్థానం")}
                    </p>
                    <div className="flex items-center space-x-2 p-3 bg-gradient-subtle rounded-lg">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{location}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {getLocalizedText("Data & Privacy", "डेटा और गोपनीयता", "డేటా మరియు గోప్యత")}
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• {getLocalizedText("Your data is stored locally on your device", "आपका डेटा आपके डिवाइस में स्थानीय रूप से संग्रहीत है", "మీ డేటా మీ పరికరంలో స్థానికంగా నిల్వ చేయబడుతుంది")}</p>
                  <p>• {getLocalizedText("Location data is used only for weather and soil information", "स्थान डेटा केवल मौसम और मिट्टी की जानकारी के लिए उपयोग किया जाता है", "స్థాన డేటా వాతావరణం మరియు మట్టి సమాచారం కోసం మాత్రమే ఉపయోగించబడుతుంది")}</p>
                  <p>• {getLocalizedText("No personal information is shared with third parties", "कोई व्यक्तिगत जानकारी तृतीय पक्षों के साथ साझा नहीं की जाती", "వ్యక్తిగత సమాచారం మూడవ పక్షాలతో పంచుకోబడదు")}</p>
                </div>
              </Card>
            </div>
          </div>
        );
      default:
        return renderHomeContent();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <div className="container max-w-md mx-auto p-4">
        {renderContent()}
      </div>
      <MobileNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={selectedLanguage}
      />
    </div>
  );
}