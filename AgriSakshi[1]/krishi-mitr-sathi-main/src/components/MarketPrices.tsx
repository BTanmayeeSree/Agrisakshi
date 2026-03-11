import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  Edit3, 
  Save, 
  X,
  RefreshCw,
  AlertCircle,
  BarChart3
} from "lucide-react";

interface CropPrice {
  id: string;
  name: string;
  nameTelugu?: string;
  nameHindi?: string;
  currentPrice: number;
  unit: string;
  predictedPrice: number;
  harvestDate: string;
  trend: "up" | "down" | "stable";
  priceChange: number;
  lastUpdated: string;
  icon: string;
}

interface MarketPricesProps {
  language: string;
}

export function MarketPrices({ language }: MarketPricesProps) {
  const [editingCrop, setEditingCrop] = useState<string | null>(null);
  const [priceData, setPriceData] = useState<CropPrice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editPrice, setEditPrice] = useState("");

  const getLocalizedText = (en: string, hi: string, te: string) => {
    switch (language) {
      case "hi": return hi;
      case "te": return te;
      default: return en;
    }
  };

  const getLocalizedName = (crop: CropPrice) => {
    switch (language) {
      case "te": return crop.nameTelugu || crop.name;
      case "hi": return crop.nameHindi || crop.name;
      default: return crop.name;
    }
  };

  // Mock market data - in real app, this would come from market APIs
  const mockMarketData: CropPrice[] = [
    {
      id: "rice",
      name: "Rice (Paddy)",
      nameTelugu: "వరి (ధాన్యం)",
      nameHindi: "चावल (धान)",
      currentPrice: 2150,
      unit: "₹/quintal",
      predictedPrice: 2350,
      harvestDate: "October 2024",
      trend: "up",
      priceChange: 9.3,
      lastUpdated: "2 hours ago",
      icon: "🌾"
    },
    {
      id: "cotton",
      name: "Cotton",
      nameTelugu: "పత్తి",
      nameHindi: "कपास",
      currentPrice: 6800,
      unit: "₹/quintal",
      predictedPrice: 6500,
      harvestDate: "December 2024",
      trend: "down",
      priceChange: -4.4,
      lastUpdated: "3 hours ago",
      icon: "🌱"
    },
    {
      id: "sugarcane",
      name: "Sugarcane",
      nameTelugu: "చెరకు",
      nameHindi: "गन्ना",
      currentPrice: 350,
      unit: "₹/quintal",
      predictedPrice: 380,
      harvestDate: "February 2025",
      trend: "up",
      priceChange: 8.6,
      lastUpdated: "1 hour ago",
      icon: "🎋"
    },
    {
      id: "wheat",
      name: "Wheat",
      nameTelugu: "గోధుమలు",
      nameHindi: "गेहूं",
      currentPrice: 2250,
      unit: "₹/quintal",
      predictedPrice: 2200,
      harvestDate: "April 2025",
      trend: "down",
      priceChange: -2.2,
      lastUpdated: "4 hours ago",
      icon: "🌾"
    },
    {
      id: "maize",
      name: "Maize (Corn)",
      nameTelugu: "మొక్కజొన్న",
      nameHindi: "मक्का",
      currentPrice: 1850,
      unit: "₹/quintal",
      predictedPrice: 1950,
      harvestDate: "January 2025",
      trend: "up",
      priceChange: 5.4,
      lastUpdated: "1 hour ago",
      icon: "🌽"
    }
  ];

  useEffect(() => {
    // Load saved prices from localStorage or use mock data
    const savedPrices = localStorage.getItem('cropPrices');
    if (savedPrices) {
      setPriceData(JSON.parse(savedPrices));
    } else {
      setPriceData(mockMarketData);
    }
  }, []);

  const handleEditPrice = (cropId: string, currentPrice: number) => {
    setEditingCrop(cropId);
    setEditPrice(currentPrice.toString());
  };

  const handleSavePrice = (cropId: string) => {
    const newPrice = parseFloat(editPrice);
    if (!isNaN(newPrice) && newPrice > 0) {
      const updatedPrices = priceData.map(crop => {
        if (crop.id === cropId) {
          const oldPrice = crop.currentPrice;
          const changePercent = ((newPrice - oldPrice) / oldPrice) * 100;
          
          // Simple prediction logic: predicted price changes based on current price update
          const predictedPrice = crop.predictedPrice + (newPrice - oldPrice);
          
          return {
            ...crop,
            currentPrice: newPrice,
            predictedPrice: Math.max(predictedPrice, newPrice * 0.8), // Minimum 20% below current
            priceChange: changePercent,
            trend: (changePercent > 2 ? "up" : changePercent < -2 ? "down" : "stable") as "up" | "down" | "stable",
            lastUpdated: "Just now"
          };
        }
        return crop;
      });
      
      setPriceData(updatedPrices);
      localStorage.setItem('cropPrices', JSON.stringify(updatedPrices));
    }
    
    setEditingCrop(null);
    setEditPrice("");
  };

  const handleCancelEdit = () => {
    setEditingCrop(null);
    setEditPrice("");
  };

  const refreshPrices = () => {
    setIsLoading(true);
    // Simulate API call to refresh prices
    setTimeout(() => {
      const updatedPrices = priceData.map(crop => ({
        ...crop,
        currentPrice: crop.currentPrice + (Math.random() - 0.5) * 100,
        predictedPrice: crop.predictedPrice + (Math.random() - 0.5) * 150,
        priceChange: (Math.random() - 0.5) * 20,
        trend: Math.random() > 0.6 ? "up" as const : Math.random() > 0.3 ? "down" as const : "stable" as const,
        lastUpdated: "Just now"
      }));
      setPriceData(updatedPrices);
      localStorage.setItem('cropPrices', JSON.stringify(updatedPrices));
      setIsLoading(false);
    }, 2000);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-600 bg-green-50 border-green-200";
      case "down": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">
          {getLocalizedText("📊 Market Prices", "📊 बाज़ार मूल्य", "📊 మార్కెట్ ధరలు")}
        </h1>
        <p className="text-muted-foreground">
          {getLocalizedText(
            "Current and predicted crop prices for better planning",
            "बेहतर योजना के लिए वर्तमान और अनुमानित फसल मूल्य",
            "మెరుగైన ప్లానింగ్ కోసం ప్రస్తుత మరియు అంచనా పంట ధరలు"
          )}
        </p>
      </div>

      {/* Refresh and Update Actions */}
      <Card className="p-4 bg-gradient-subtle">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-crop-green" />
            <span className="font-medium text-foreground">
              {getLocalizedText("Market Overview", "बाज़ार अवलोकन", "మార్కెట్ అవలోకనం")}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshPrices}
            disabled={isLoading}
            className="border-crop-green text-crop-green hover:bg-crop-light"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            {getLocalizedText("Refresh", "ताज़ा करें", "రిఫ్రెష్")}
          </Button>
        </div>
      </Card>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">
            {getLocalizedText("Current Prices", "वर्तमान मूल्य", "ప్రస్తుత ధరలు")}
          </TabsTrigger>
          <TabsTrigger value="predicted">
            {getLocalizedText("Harvest Forecast", "फसल पूर्वानुमान", "పంట అంచనా")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <div className="space-y-4">
            {priceData.map((crop) => (
              <Card key={crop.id} className="p-4 hover:shadow-card transition-smooth">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{crop.icon}</span>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {getLocalizedName(crop)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {getLocalizedText("Updated", "अपडेट किया गया", "అప్‌డేట్ చేయబడింది")} {crop.lastUpdated}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    {editingCrop === crop.id ? (
                      <div className="flex items-center space-x-2">
                        <Input
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-24 h-8 text-sm"
                          placeholder="Price"
                          type="number"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleSavePrice(crop.id)}
                          className="h-8 px-2 bg-crop-green text-white hover:bg-crop-green/90"
                        >
                          <Save className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                          className="h-8 px-2"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-foreground">
                            ₹{crop.currentPrice.toLocaleString()}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditPrice(crop.id, crop.currentPrice)}
                            className="h-6 w-6 p-0 hover:bg-crop-light"
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-end space-x-2">
                          <Badge className={`${getTrendColor(crop.trend)} border text-xs`}>
                            {getTrendIcon(crop.trend)}
                            <span className="ml-1">
                              {crop.priceChange > 0 ? "+" : ""}{crop.priceChange.toFixed(1)}%
                            </span>
                          </Badge>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predicted" className="space-y-4">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">
                {getLocalizedText("Price Forecast Information", "मूल्य पूर्वानुमान जानकारी", "ధర అంచనా సమాచారం")}
              </span>
            </div>
            <p className="text-sm text-blue-700">
              {getLocalizedText(
                "Predicted prices are based on seasonal trends, market analysis, and historical data. Actual prices may vary.",
                "अनुमानित मूल्य मौसमी रुझान, बाजार विश्लेषण और ऐतिहासिक डेटा पर आधारित हैं। वास्तविक मूल्य भिन्न हो सकते हैं।",
                "అంచనా ధరలు కాలానుగుణ ట్రెండ్‌లు, మార్కెట్ విశ్లేషణ మరియు చారిత్రక డేటా ఆధారంగా ఉంటాయి. వాస్తవ ధరలు మారవచ్చు."
              )}
            </p>
          </Card>

          <div className="space-y-4">
            {priceData.map((crop) => (
              <Card key={crop.id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{crop.icon}</span>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {getLocalizedName(crop)}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {getLocalizedText("Harvest", "फसल", "పంట")}: {crop.harvestDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      {getLocalizedText("Current Price", "वर्तमान मूल्य", "ప్రస్తుత ధర")}
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      ₹{crop.currentPrice.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">{crop.unit}</p>
                  </div>
                  
                  <div className="text-center p-3 bg-crop-light/20 rounded-lg border border-crop-green/30">
                    <p className="text-sm text-muted-foreground mb-1">
                      {getLocalizedText("Predicted Price", "अनुमानित मूल्य", "అంచనా ధర")}
                    </p>
                    <p className="text-lg font-semibold text-crop-green">
                      ₹{crop.predictedPrice.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">{crop.unit}</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gradient-subtle rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {getLocalizedText("Expected Profit", "अपेक्षित लाभ", "ఆశించిన లాభం")}
                    </span>
                    <div className="flex items-center space-x-1">
                      {crop.predictedPrice > crop.currentPrice ? (
                        <>
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-green-600 font-semibold">
                            +₹{(crop.predictedPrice - crop.currentPrice).toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-4 h-4 text-red-600" />
                          <span className="text-red-600 font-semibold">
                            -₹{(crop.currentPrice - crop.predictedPrice).toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}