import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, TestTube, CheckCircle, AlertCircle } from "lucide-react";

interface SoilData {
  soilType: string;
  pH: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  source: "auto" | "manual";
}

interface SoilTestProps {
  location: string;
  onSoilDataUpdate: (data: SoilData) => void;
  language: string;
}

export function SoilTest({ location, onSoilDataUpdate, language }: SoilTestProps) {
  const [activeTab, setActiveTab] = useState("auto");
  const [isLoading, setIsLoading] = useState(false);
  const [autoSoilData, setAutoSoilData] = useState<SoilData | null>(null);
  const [manualData, setManualData] = useState({
    soilType: "",
    pH: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    organicMatter: ""
  });

  const getLocalizedText = (en: string, hi: string, te: string) => {
    switch (language) {
      case "hi": return hi;
      case "te": return te;
      default: return en;
    }
  };

  const detectSoilAutomatically = async () => {
    setIsLoading(true);
    // Simulate API call for soil detection based on location
    setTimeout(() => {
      const mockSoilData: SoilData = {
        soilType: "Red Soil (Alfisol)",
        pH: 6.2,
        nitrogen: 245,
        phosphorus: 18,
        potassium: 180,
        organicMatter: 1.8,
        source: "auto"
      };
      setAutoSoilData(mockSoilData);
      onSoilDataUpdate(mockSoilData);
      setIsLoading(false);
    }, 2000);
  };

  const handleManualSubmit = () => {
    const manualSoilData: SoilData = {
      soilType: manualData.soilType || "Unknown",
      pH: parseFloat(manualData.pH) || 7.0,
      nitrogen: parseFloat(manualData.nitrogen) || 0,
      phosphorus: parseFloat(manualData.phosphorus) || 0,
      potassium: parseFloat(manualData.potassium) || 0,
      organicMatter: parseFloat(manualData.organicMatter) || 0,
      source: "manual"
    };
    onSoilDataUpdate(manualSoilData);
  };

  const getSoilHealthColor = (value: number, type: string) => {
    switch (type) {
      case "pH":
        if (value >= 6.0 && value <= 7.5) return "bg-crop-green";
        if (value >= 5.5 && value <= 8.0) return "bg-harvest-gold";
        return "bg-destructive";
      case "nitrogen":
        if (value >= 200) return "bg-crop-green";
        if (value >= 100) return "bg-harvest-gold";
        return "bg-destructive";
      case "phosphorus":
        if (value >= 15) return "bg-crop-green";
        if (value >= 8) return "bg-harvest-gold";
        return "bg-destructive";
      case "potassium":
        if (value >= 150) return "bg-crop-green";
        if (value >= 100) return "bg-harvest-gold";
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">
          {getLocalizedText("🌱 Soil Analysis", "🌱 मिट्टी विश्लेषण", "🌱 మట్టి విశ్లేషణ")}
        </h1>
        <p className="text-muted-foreground">
          {getLocalizedText(
            "Get accurate soil information for better crop recommendations",
            "बेहतर फसल सुझाव के लिए सटीक मिट्टी की जानकारी प्राप्त करें",
            "మెరుగైన పంట సిఫార్సుల కోసం ఖచ్చితమైన మట్టి సమాచారం పొందండి"
          )}
        </p>
      </div>

      <Card className="p-4 bg-soil-light/20 border-soil-medium">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="w-4 h-4 text-soil-dark" />
          <span className="text-sm font-medium text-foreground">
            {getLocalizedText("Current Location", "वर्तमान स्थान", "ప్రస్తుత స్థానం")}
          </span>
        </div>
        <p className="text-soil-dark">{location}</p>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="auto">
            {getLocalizedText("Auto Detect", "स्वचालित", "ఆటో డిటెక్ట్")}
          </TabsTrigger>
          <TabsTrigger value="manual">
            {getLocalizedText("Manual Entry", "मैन्युअल", "మాన్యువల్")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="auto" className="space-y-4">
          <Card className="p-6">
            <div className="text-center space-y-4">
              <TestTube className="w-12 h-12 text-soil-dark mx-auto" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  {getLocalizedText("Automatic Detection", "स्वचालित पहचान", "ఆటోమేటిక్ గుర్తింపు")}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {getLocalizedText(
                    "Get soil information based on your location and regional data",
                    "अपने स्थान और क्षेत्रीय डेटा के आधार पर मिट्टी की जानकारी प्राप्त करें",
                    "మీ స్థానం మరియు ప్రాంతీయ డేటా ఆధారంగా మట్టి సమాచారం పొందండి"
                  )}
                </p>
                <Button
                  onClick={detectSoilAutomatically}
                  disabled={isLoading}
                  className="w-full bg-soil-dark text-white hover:bg-soil-dark/90"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{getLocalizedText("Analyzing...", "विश्लेषण...", "విశ్లేషిస్తోంది...")}</span>
                    </div>
                  ) : (
                    getLocalizedText("Detect Soil Type", "मिट्टी का प्रकार पहचानें", "మట్టి రకం గుర్తించండి")
                  )}
                </Button>
              </div>
            </div>

            {autoSoilData && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-2 text-crop-green">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">
                    {getLocalizedText("Analysis Complete", "विश्लेषण पूर्ण", "విశ్లేషణ పూర్తి")}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      {getLocalizedText("Soil Type", "मिट्टी का प्रकार", "మట్టి రకం")}
                    </Label>
                    <p className="font-medium text-foreground">{autoSoilData.soilType}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">pH Level</Label>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{autoSoilData.pH}</span>
                      <Badge className={`${getSoilHealthColor(autoSoilData.pH, "pH")} text-white border-0`}>
                        {autoSoilData.pH >= 6.0 && autoSoilData.pH <= 7.5 ? "Good" : "Needs Attention"}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      {getLocalizedText("Nitrogen (kg/ha)", "नाइट्रोजन", "నత్రజని")}
                    </Label>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{autoSoilData.nitrogen}</span>
                      <Badge className={`${getSoilHealthColor(autoSoilData.nitrogen, "nitrogen")} text-white border-0`}>
                        {autoSoilData.nitrogen >= 200 ? "High" : autoSoilData.nitrogen >= 100 ? "Medium" : "Low"}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      {getLocalizedText("Phosphorus (kg/ha)", "फास्फोरस", "భాస్వరం")}
                    </Label>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{autoSoilData.phosphorus}</span>
                      <Badge className={`${getSoilHealthColor(autoSoilData.phosphorus, "phosphorus")} text-white border-0`}>
                        {autoSoilData.phosphorus >= 15 ? "High" : autoSoilData.phosphorus >= 8 ? "Medium" : "Low"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="w-5 h-5 text-harvest-gold" />
                <span className="text-sm text-muted-foreground">
                  {getLocalizedText(
                    "Enter your soil test results manually",
                    "अपने मिट्टी परीक्षण के परिणाम मैन्युअल रूप से दर्ज करें",
                    "మీ మట్టి పరీక్ష ఫలితాలను మాన్యువల్‌గా నమోదు చేయండి"
                  )}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="soilType">
                    {getLocalizedText("Soil Type", "मिट्टी का प्रकार", "మట్టి రకం")}
                  </Label>
                  <Input
                    id="soilType"
                    placeholder={getLocalizedText("e.g., Red Soil", "जैसे, लाल मिट्टी", "ఉదా, ఎర్ర మట్టి")}
                    value={manualData.soilType}
                    onChange={(e) => setManualData({...manualData, soilType: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="pH">pH Level (0-14)</Label>
                  <Input
                    id="pH"
                    type="number"
                    step="0.1"
                    placeholder="6.5"
                    value={manualData.pH}
                    onChange={(e) => setManualData({...manualData, pH: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="nitrogen">
                    {getLocalizedText("Nitrogen (kg/ha)", "नाइट्रोजन", "నత్రజని")}
                  </Label>
                  <Input
                    id="nitrogen"
                    type="number"
                    placeholder="200"
                    value={manualData.nitrogen}
                    onChange={(e) => setManualData({...manualData, nitrogen: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phosphorus">
                    {getLocalizedText("Phosphorus (kg/ha)", "फास्फोरस", "భాస్వరం")}
                  </Label>
                  <Input
                    id="phosphorus"
                    type="number"
                    placeholder="15"
                    value={manualData.phosphorus}
                    onChange={(e) => setManualData({...manualData, phosphorus: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="potassium">
                    {getLocalizedText("Potassium (kg/ha)", "पोटेशियम", "పొటాషియం")}
                  </Label>
                  <Input
                    id="potassium"
                    type="number"
                    placeholder="150"
                    value={manualData.potassium}
                    onChange={(e) => setManualData({...manualData, potassium: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="organicMatter">
                    {getLocalizedText("Organic Matter (%)", "जैविक पदार्थ", "సేంద్రియ పదార్థం")}
                  </Label>
                  <Input
                    id="organicMatter"
                    type="number"
                    step="0.1"
                    placeholder="2.0"
                    value={manualData.organicMatter}
                    onChange={(e) => setManualData({...manualData, organicMatter: e.target.value})}
                  />
                </div>
              </div>

              <Button 
                onClick={handleManualSubmit}
                className="w-full bg-soil-dark text-white hover:bg-soil-dark/90"
              >
                {getLocalizedText("Save Soil Data", "मिट्टी डेटा सेव करें", "మట్టి డేటా సేవ్ చేయండి")}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}