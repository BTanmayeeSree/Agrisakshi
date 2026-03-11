import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Edit3, Save, X } from "lucide-react";

interface FarmerProfile {
  name: string;
  location: string;
  farmSize: string;
  irrigation: string;
  soilType: string;
  lastCrop: string;
  experience: string;
}

interface EditableProfileProps {
  profile: FarmerProfile;
  language: string;
  onProfileUpdate: (profile: FarmerProfile) => void;
}

export function EditableProfile({ profile, language, onProfileUpdate }: EditableProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<FarmerProfile>(profile);

  const getLocalizedText = (en: string, hi: string, te: string) => {
    switch (language) {
      case "hi": return hi;
      case "te": return te;
      default: return en;
    }
  };

  const handleSave = () => {
    onProfileUpdate(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">
          {getLocalizedText("👨‍🌾 Farmer Profile", "👨‍🌾 किसान प्रोफाइल", "👨‍🌾 రైతు ప్రొఫైల్")}
        </h1>
        <p className="text-muted-foreground">
          {getLocalizedText(
            "Manage your farm information for better recommendations",
            "बेहतर सुझाव के लिए अपनी खेती की जानकारी प्रबंधित करें",
            "మెరుగైన సిఫార్సుల కోసం మీ వ్యవసాయ సమాచారాన్ని నిర్వహించండి"
          )}
        </p>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-crop-light rounded-full flex items-center justify-center">
              <span className="text-2xl">👨‍🌾</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {isEditing ? getLocalizedText("Edit Profile", "प्रोफाइल संपादित करें", "ప్రొఫైల్ ఎడిట్ చేయండి") : profile.name || getLocalizedText("Farmer", "किसान", "రైతు")}
              </h3>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>
          
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="border-crop-green text-crop-green hover:bg-crop-light"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              {getLocalizedText("Edit", "संपादित करें", "ఎడిట్")}
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-1" />
                {getLocalizedText("Cancel", "रद्द करें", "రద్దు")}
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-crop-green text-white hover:bg-crop-green/90"
              >
                <Save className="w-4 h-4 mr-1" />
                {getLocalizedText("Save", "सेव करें", "సేవ్")}
              </Button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">
                  {getLocalizedText("Farmer Name", "किसान का नाम", "రైతు పేరు")}
                </Label>
                <Input
                  id="name"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  placeholder={getLocalizedText("Enter your name", "अपना नाम दर्ज करें", "మీ పేరు నమోదు చేయండి")}
                />
              </div>
              <div>
                <Label htmlFor="experience">
                  {getLocalizedText("Experience", "अनुभव", "అనుభవం")}
                </Label>
                <Select
                  value={editedProfile.experience}
                  onValueChange={(value) => setEditedProfile({...editedProfile, experience: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={getLocalizedText("Select experience", "अनुभव चुनें", "అనుభవం ఎంచుకోండి")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 {getLocalizedText("years", "साल", "సంవత్సరాలు")}</SelectItem>
                    <SelectItem value="3-5">3-5 {getLocalizedText("years", "साल", "సంవత్సరాలు")}</SelectItem>
                    <SelectItem value="6-10">6-10 {getLocalizedText("years", "साल", "సంవత్సరాలు")}</SelectItem>
                    <SelectItem value="10+">10+ {getLocalizedText("years", "साल", "సంవత్సరాలు")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="location">
                {getLocalizedText("Location", "स्थान", "స్థానం")}
              </Label>
              <Input
                id="location"
                value={editedProfile.location}
                onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                placeholder={getLocalizedText("City, State", "शहर, राज्य", "నగరం, రాష్ట్రం")}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="farmSize">
                  {getLocalizedText("Farm Size", "खेत का आकार", "పొలం పరిమాణం")}
                </Label>
                <Select
                  value={editedProfile.farmSize}
                  onValueChange={(value) => setEditedProfile({...editedProfile, farmSize: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={getLocalizedText("Select size", "आकार चुनें", "పరిమాణం ఎంచుకోండి")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<1">{"<1"} {getLocalizedText("acre", "एकड़", "ఎకరం")}</SelectItem>
                    <SelectItem value="1-2">1-2 {getLocalizedText("acres", "एकड़", "ఎకరాలు")}</SelectItem>
                    <SelectItem value="3-5">3-5 {getLocalizedText("acres", "एकड़", "ఎకరాలు")}</SelectItem>
                    <SelectItem value="6-10">6-10 {getLocalizedText("acres", "एकड़", "ఎకరాలు")}</SelectItem>
                    <SelectItem value="10+">10+ {getLocalizedText("acres", "एकड़", "ఎకరాలు")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="irrigation">
                  {getLocalizedText("Irrigation Type", "सिंचाई का प्रकार", "నీటిపారుదల రకం")}
                </Label>
                <Select
                  value={editedProfile.irrigation}
                  onValueChange={(value) => setEditedProfile({...editedProfile, irrigation: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={getLocalizedText("Select type", "प्रकार चुनें", "రకం ఎంచుకోండి")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drip">
                      {getLocalizedText("Drip", "ड्रिप", "డ్రిప్")}
                    </SelectItem>
                    <SelectItem value="sprinkler">
                      {getLocalizedText("Sprinkler", "स्प्रिंकलर", "స్ప్రింక్లర్")}
                    </SelectItem>
                    <SelectItem value="flood">
                      {getLocalizedText("Flood", "बाढ़", "వరద")}
                    </SelectItem>
                    <SelectItem value="rainfed">
                      {getLocalizedText("Rain-fed", "वर्षा आधारित", "వర్షాధార")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="soilType">
                  {getLocalizedText("Soil Type", "मिट्टी का प्रकार", "మట్టి రకం")}
                </Label>
                <Select
                  value={editedProfile.soilType}
                  onValueChange={(value) => setEditedProfile({...editedProfile, soilType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={getLocalizedText("Select soil type", "मिट्टी का प्रकार चुनें", "మట్టి రకం ఎంచుకోండి")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="red">
                      {getLocalizedText("Red Soil", "लाल मिट्टी", "ఎర్ర మట్టి")}
                    </SelectItem>
                    <SelectItem value="black">
                      {getLocalizedText("Black Soil", "काली मिट्टी", "నల్ల మట్టి")}
                    </SelectItem>
                    <SelectItem value="alluvial">
                      {getLocalizedText("Alluvial Soil", "जलोढ़ मिट्टी", "ఒండ్రు మట్టి")}
                    </SelectItem>
                    <SelectItem value="clay">
                      {getLocalizedText("Clay Soil", "चिकनी मिट्टी", "బంకమట్టి")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="lastCrop">
                  {getLocalizedText("Last Season Crop", "पिछली फसल", "గత సీజన్ పంట")}
                </Label>
                <Input
                  id="lastCrop"
                  value={editedProfile.lastCrop}
                  onChange={(e) => setEditedProfile({...editedProfile, lastCrop: e.target.value})}
                  placeholder={getLocalizedText("e.g., Rice", "जैसे, धान", "ఉదా, వరి")}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">
                  {getLocalizedText("Farm Size", "खेत का आकार", "పొలం పరిమాణం")}
                </Label>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-crop-light text-crop-green border-0">
                    {profile.farmSize} {getLocalizedText("acres", "एकड़", "ఎకరాలు")}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">
                  {getLocalizedText("Irrigation", "सिंचाई", "నీటిపారుదల")}
                </Label>
                <p className="font-semibold text-foreground capitalize">{profile.irrigation}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">
                  {getLocalizedText("Experience", "अनुभव", "అనుభవం")}
                </Label>
                <p className="font-semibold text-foreground">
                  {profile.experience} {getLocalizedText("years", "साल", "సంవత్సరాలు")}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">
                  {getLocalizedText("Soil Type", "मिट्टी का प्रकार", "మట్టి రకం")}
                </Label>
                <p className="font-semibold text-foreground capitalize">{profile.soilType}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">
                  {getLocalizedText("Last Crop", "पिछली फसल", "గత పంట")}
                </Label>
                <p className="font-semibold text-foreground">{profile.lastCrop}</p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {!isEditing && (
        <Card className="p-4 bg-gradient-subtle">
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-foreground">
              {getLocalizedText("Profile Completion", "प्रोफाइल पूर्णता", "ప్రొఫైల్ పూర్తిత")}
            </h4>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-crop-green h-2 rounded-full transition-all duration-500" 
                style={{ width: "85%" }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground">
              85% {getLocalizedText("complete", "पूर्ण", "పూర్తి")} • 
              {getLocalizedText(" Add more details for better recommendations", " बेहतर सुझाव के लिए और विवरण जोड़ें", " మెరుగైన సిఫార్సుల కోసం మరిన్ని వివరాలు జోడించండి")}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}