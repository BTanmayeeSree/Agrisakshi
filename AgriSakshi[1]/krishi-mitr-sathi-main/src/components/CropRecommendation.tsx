import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sprout, TrendingUp, Calendar, Info } from "lucide-react";

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

interface CropRecommendationProps {
  recommendations: CropData[];
  language: string;
  onCropSelect: (crop: CropData) => void;
}

export function CropRecommendation({ recommendations, language, onCropSelect }: CropRecommendationProps) {
  const getLocalizedName = (crop: CropData) => {
    switch (language) {
      case "te":
        return crop.nameTelugu || crop.name;
      case "hi":
        return crop.nameHindi || crop.name;
      default:
        return crop.name;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "bg-crop-green";
    if (score >= 70) return "bg-harvest-gold";
    return "bg-muted";
  };

  const getScoreText = (score: number) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    return "Fair";
  };

  const topRecommendation = recommendations[0];
  const otherRecommendations = recommendations.slice(1);

  return (
    <div className="space-y-4">
      {/* Best Recommendation */}
      <Card className="p-6 bg-gradient-crop shadow-elevated border-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{topRecommendation.icon}</span>
            <div>
              <Badge className="bg-white/20 text-white border-0 mb-2">
                🏆 Best Match
              </Badge>
              <h3 className="text-2xl font-bold text-white">
                {getLocalizedName(topRecommendation)}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-white font-semibold ${getScoreColor(topRecommendation.suitabilityScore)}`}>
              {topRecommendation.suitabilityScore}% {getScoreText(topRecommendation.suitabilityScore)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="w-4 h-4 text-white" />
              <span className="text-sm text-white/80">Expected Yield</span>
            </div>
            <p className="text-lg font-semibold text-white">{topRecommendation.expectedYield}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-white/80">💰</span>
              <span className="text-sm text-white/80">Profit Potential</span>
            </div>
            <p className="text-lg font-semibold text-white">{topRecommendation.profitPotential}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Sprout className="w-4 h-4 text-white" />
              <span className="text-sm text-white/80">Sowing</span>
            </div>
            <p className="text-sm font-medium text-white">{topRecommendation.sowingWindow}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Calendar className="w-4 h-4 text-white" />
              <span className="text-sm text-white/80">Harvest</span>
            </div>
            <p className="text-sm font-medium text-white">{topRecommendation.harvestWindow}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-white/80" />
            <span className="text-sm text-white/80 font-medium">Why this crop?</span>
          </div>
          <div className="space-y-1">
            {topRecommendation.reasons.map((reason, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-white/60">•</span>
                <span className="text-sm text-white/90">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={() => onCropSelect(topRecommendation)}
          className="w-full h-12 bg-white text-crop-green font-semibold hover:bg-white/90 shadow-card"
        >
          Get Complete Guide • पूरी जानकारी • పూర్తి గైడ్
        </Button>
      </Card>

      {/* Other Recommendations */}
      {otherRecommendations.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Other Good Options</h4>
          {otherRecommendations.map((crop) => (
            <Card
              key={crop.id}
              className="p-4 cursor-pointer hover:shadow-card transition-smooth border-2 hover:border-crop-green/30"
              onClick={() => onCropSelect(crop)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{crop.icon}</span>
                  <div>
                    <h5 className="font-semibold text-foreground">
                      {getLocalizedName(crop)}
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      {crop.expectedYield} • {crop.profitPotential}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-soil-light">
                  {crop.suitabilityScore}%
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
