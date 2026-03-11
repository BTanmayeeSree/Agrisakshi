import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Sprout, 
  Droplets, 
  Bug, 
  TrendingUp, 
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowLeft
} from "lucide-react";

interface CropData {
  id: string;
  name: string;
  nameTelugu?: string;
  nameHindi?: string;
  suitabilityScore: number;
  expectedYield: string;
  profitPotential: string;
  sowingWindow: string;
  harvestWindow: string;
  reasons: string[];
  icon: string;
}

interface CropGuideProps {
  crop: CropData;
  language: string;
  onBack: () => void;
}

export function CropGuide({ crop, language, onBack }: CropGuideProps) {
  const getLocalizedText = (en: string, hi: string, te: string) => {
    switch (language) {
      case "hi": return hi;
      case "te": return te;
      default: return en;
    }
  };

  const getLocalizedName = (crop: CropData) => {
    switch (language) {
      case "te": return crop.nameTelugu || crop.name;
      case "hi": return crop.nameHindi || crop.name;
      default: return crop.name;
    }
  };

  // Mock detailed guide data - in real app, this would come from API
  const guideData = {
    planting: {
      seedRate: crop.id === "rice" ? "20-25 kg/hectare" : crop.id === "cotton" ? "1.5-2 kg/hectare" : "3-4 buds/hectare",
      spacing: crop.id === "rice" ? "20cm x 15cm" : crop.id === "cotton" ? "90cm x 45cm" : "150cm x 150cm",
      depth: crop.id === "rice" ? "2-3 cm" : crop.id === "cotton" ? "3-4 cm" : "8-10 cm",
      method: crop.id === "rice" ? "Transplanting" : crop.id === "cotton" ? "Direct sowing" : "Planting",
    },
    schedule: [
      { stage: getLocalizedText("Land preparation", "भूमि तैयारी", "భూమి తయారీ"), days: "15-20 days before sowing", task: getLocalizedText("Deep plowing and field leveling", "गहरी जुताई और खेत को समतल करना", "లోతైన దున్నుట మరియు పొలం సమం చేయుట") },
      { stage: getLocalizedText("Sowing", "बुआई", "విత్తనాలు"), days: crop.sowingWindow, task: getLocalizedText("Plant seeds with proper spacing", "उचित दूरी के साथ बीज बोएं", "సరైన దూరంతో విత్తనాలు వేయండి") },
      { stage: getLocalizedText("First irrigation", "पहली सिंचाई", "మొదటి నీరు"), days: "7-10 days after sowing", task: getLocalizedText("Light irrigation to ensure germination", "अंकुरण सुनिश्चित करने के लिए हल्की सिंचाई", "మొలకలు రావడానికి తేలికపాటి నీరు") },
      { stage: getLocalizedText("Fertilizer application", "उर्वरक प्रयोग", "ఎరువుల వాడకం"), days: "20-25 days after sowing", task: getLocalizedText("Apply recommended NPK fertilizers", "अनुशंसित NPK उर्वरक डालें", "సిఫార్సు చేసిన NPK ఎరువులు వేయండి") },
      { stage: getLocalizedText("Harvest", "कटाई", "కోత"), days: crop.harvestWindow, task: getLocalizedText("Harvest when crops are fully mature", "फसल पूरी तरह पकने पर कटाई करें", "పంటలు పూర్తిగా పండినప్పుడు కోయండి") }
    ],
    fertilizers: [
      { name: "Urea", type: "Nitrogen", application: getLocalizedText("50 kg/hectare at sowing", "बुआई के समय 50 किग्रा/हेक्टेयर", "విత్తనాల సమయంలో 50 కిలోలు/హెక్టరు"), timing: getLocalizedText("Basal dose", "आधार मात्रा", "ప్రాథమిక మోతాదు") },
      { name: "DAP", type: "Phosphorus", application: getLocalizedText("100 kg/hectare", "100 किग्रा/हेक्टेयर", "100 కిలోలు/హెక్టరు"), timing: getLocalizedText("At sowing", "बुआई के समय", "విత్తనాల సమయంలో") },
      { name: "MOP", type: "Potassium", application: getLocalizedText("50 kg/hectare", "50 किग्रा/हेक्टेयर", "50 కిలోలు/హెక్టరు"), timing: getLocalizedText("Split application", "विभाजित प्रयोग", "విభజిత వాడకం") },
      { name: getLocalizedText("Organic manure", "जैविक खाद", "సేంద్రీయ ఎరువులు"), type: getLocalizedText("Organic", "जैविक", "సేంద్రీయ"), application: getLocalizedText("5-10 tons/hectare", "5-10 टन/हेक्टेयर", "5-10 టన్నులు/హెక్టరు"), timing: getLocalizedText("Before sowing", "बुआई से पहले", "విత్తనాలకు ముందు") }
    ],
    pesticides: [
      { 
        pest: crop.id === "rice" ? "Brown Plant Hopper" : crop.id === "cotton" ? "Bollworm" : "Red Rot", 
        solution: crop.id === "rice" ? "Imidacloprid" : crop.id === "cotton" ? "Bt Cotton seeds" : "Carbendazim",
        application: getLocalizedText("As per label instructions", "लेबल निर्देशों के अनुसार", "లేబుల్ సూచనల ప్రకారం"),
        precaution: getLocalizedText("Use protective equipment", "सुरक्षा उपकरण का उपयोग करें", "రక్షణ పరికరాలను ఉపయోగించండి")
      },
      { 
        pest: crop.id === "rice" ? "Blast Disease" : crop.id === "cotton" ? "Aphids" : "Borer",
        solution: crop.id === "rice" ? "Tricyclazole" : crop.id === "cotton" ? "Dimethoate" : "Chlorpyrifos",
        application: getLocalizedText("Spray during early morning", "सुबह जल्दी छिड़काव करें", "తెల్లవారుజామున పిచికారీ చేయండి"),
        precaution: getLocalizedText("Avoid during flowering", "फूल आने के दौरान बचें", "పువ్వుల సమయంలో వేయవద్దు")
      }
    ],
    irrigation: {
      frequency: crop.id === "rice" ? getLocalizedText("Keep field flooded", "खेत में पानी भरा रखें", "పొలంలో నీరు నిలిపి ఉంచండి") : 
                 crop.id === "cotton" ? getLocalizedText("Weekly irrigation", "साप्ताहिक सिंचाई", "వారంకు ఒకసారి నీరు") : 
                 getLocalizedText("15-20 days interval", "15-20 दिन का अंतराल", "15-20 రోజుల అంతరం"),
      amount: crop.id === "rice" ? "5-10 cm standing water" : 
              crop.id === "cotton" ? "25-30 mm per irrigation" : 
              "40-50 mm per irrigation",
      critical: getLocalizedText("Critical stages: flowering and grain filling", "महत्वपूर्ण चरण: फूल आना और दाना भरना", "కీలక దశలు: పుష్పించుట మరియు గింజలు నిండుట")
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{crop.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {getLocalizedName(crop)}
              </h1>
              <p className="text-muted-foreground">
                {getLocalizedText("Complete Growing Guide", "पूर्ण उगाने की गाइड", "పూర్తి పెంపకం గైడ్")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-crop">
          <div className="text-center text-white">
            <TrendingUp className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm opacity-90">
              {getLocalizedText("Expected Yield", "अपेक्षित उत्पादन", "ఆశించిన దిగుబడి")}
            </p>
            <p className="text-lg font-bold">{crop.expectedYield}</p>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-subtle">
          <div className="text-center">
            <span className="text-2xl mb-2 block">💰</span>
            <p className="text-sm text-muted-foreground">
              {getLocalizedText("Profit Potential", "लाभ की संभावना", "లాభం అవకాశం")}
            </p>
            <p className="text-lg font-bold text-foreground">{crop.profitPotential}</p>
          </div>
        </Card>
      </div>

      {/* Detailed Guide Tabs */}
      <Tabs defaultValue="planting" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="planting">
            {getLocalizedText("Plant", "रोपण", "నాటుట")}
          </TabsTrigger>
          <TabsTrigger value="schedule">
            {getLocalizedText("Schedule", "कार्यक्रम", "షెడ్యూల్")}
          </TabsTrigger>
          <TabsTrigger value="inputs">
            {getLocalizedText("Inputs", "सामग्री", "ఇన్‌పుట్స్")}
          </TabsTrigger>
          <TabsTrigger value="protection">
            {getLocalizedText("Protect", "सुरक्षा", "రక్షణ")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="planting" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Sprout className="w-5 h-5 mr-2 text-crop-green" />
              {getLocalizedText("Planting Guidelines", "रोपण दिशा-निर्देश", "నాటడం దిశానిర్దేశాలు")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Badge variant="outline" className="mb-2">
                  {getLocalizedText("Seed Rate", "बीज दर", "విత్తన రేటు")}
                </Badge>
                <p className="font-medium text-foreground">{guideData.planting.seedRate}</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">
                  {getLocalizedText("Spacing", "दूरी", "అంతరం")}
                </Badge>
                <p className="font-medium text-foreground">{guideData.planting.spacing}</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">
                  {getLocalizedText("Depth", "गहराई", "లోతు")}
                </Badge>
                <p className="font-medium text-foreground">{guideData.planting.depth}</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">
                  {getLocalizedText("Method", "विधि", "విధానం")}
                </Badge>
                <p className="font-medium text-foreground">{guideData.planting.method}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-4 flex items-center">
              <Droplets className="w-5 h-5 mr-2 text-blue-500" />
              {getLocalizedText("Irrigation Guidelines", "सिंचाई दिशा-निर्देश", "నీటిపారుదల దిశానిర్దేశాలు")}
            </h4>
            <div className="space-y-3">
              <div>
                <Label className="text-sm text-muted-foreground">
                  {getLocalizedText("Frequency", "आवृत्ति", "ఫ్రీక్వెన్సీ")}
                </Label>
                <p className="font-medium text-foreground">{guideData.irrigation.frequency}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">
                  {getLocalizedText("Amount per irrigation", "प्रति सिंचाई मात्रा", "ప్రతి నీటిపారుదలకు మోతాదు")}
                </Label>
                <p className="font-medium text-foreground">{guideData.irrigation.amount}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <AlertTriangle className="w-4 h-4 inline mr-1" />
                  {guideData.irrigation.critical}
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-harvest-gold" />
              {getLocalizedText("Crop Calendar", "फसल कैलेंडर", "పంట క్యాలెండర్")}
            </h3>
            <div className="space-y-4">
              {guideData.schedule.map((stage, index) => (
                <div key={index} className="flex space-x-4 p-4 bg-gradient-subtle rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-crop-green rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{stage.stage}</h4>
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {stage.days}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{stage.task}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="inputs" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {getLocalizedText("Fertilizer Schedule", "उर्वरक कार्यक्रम", "ఎరువుల షెడ్యూల్")}
            </h3>
            <div className="space-y-4">
              {guideData.fertilizers.map((fertilizer, index) => (
                <div key={index} className="p-4 border border-soil-light rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{fertilizer.name}</h4>
                    <Badge className="bg-soil-light text-soil-dark border-0">
                      {fertilizer.type}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        {getLocalizedText("Application", "प्रयोग", "వాడకం")}:
                      </span>
                      <p className="font-medium text-foreground">{fertilizer.application}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        {getLocalizedText("Timing", "समय", "సమయం")}:
                      </span>
                      <p className="font-medium text-foreground">{fertilizer.timing}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="protection" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Bug className="w-5 h-5 mr-2 text-red-500" />
              {getLocalizedText("Pest & Disease Management", "कीट और रोग प्रबंधन", "కీటకాలు మరియు వ్యాధుల నిర్వహణ")}
            </h3>
            <div className="space-y-4">
              {guideData.pesticides.map((pesticide, index) => (
                <div key={index} className="p-4 border border-red-100 rounded-lg bg-red-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-red-800">{pesticide.pest}</h4>
                    <Badge className="bg-red-200 text-red-800 border-0">
                      {getLocalizedText("Treatment", "उपचार", "చికిత్స")}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-red-700">
                        {getLocalizedText("Solution", "समाधान", "పరిష్కారం")}:
                      </span>
                      <span className="ml-2 text-red-800">{pesticide.solution}</span>
                    </div>
                    <div>
                      <span className="font-medium text-red-700">
                        {getLocalizedText("Application", "प्रयोग", "వాడకం")}:
                      </span>
                      <span className="ml-2 text-red-800">{pesticide.application}</span>
                    </div>
                    <div className="flex items-center mt-2 p-2 bg-red-100 rounded">
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                      <span className="text-red-700 text-xs">{pesticide.precaution}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="font-semibold text-yellow-800">
                  {getLocalizedText("Safety Guidelines", "सुरक्षा दिशा-निर्देश", "భద్రతా దిశానిర్దేశాలు")}
                </span>
              </div>
              <ul className="text-sm text-yellow-800 space-y-1 ml-7">
                <li>• {getLocalizedText("Always wear protective equipment", "हमेशा सुरक्षा उपकरण पहनें", "ఎల్లప్పుడూ రక్షణ పరికరాలను ధరించండి")}</li>
                <li>• {getLocalizedText("Spray during calm weather", "शांत मौसम में छिड़काव करें", "ప్రశాంత వాతావరణంలో పిచికారీ చేయండి")}</li>
                <li>• {getLocalizedText("Follow label instructions", "लेबल निर्देशों का पालन करें", "లేబుల్ సూచనలను అనుసరించండి")}</li>
              </ul>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Label({ children, className = "", ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) {
  return (
    <span className={`text-sm font-medium text-muted-foreground ${className}`} {...props}>
      {children}
    </span>
  );
}