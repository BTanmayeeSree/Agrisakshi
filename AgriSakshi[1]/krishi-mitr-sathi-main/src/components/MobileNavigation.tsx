import { useState } from "react";
import { Home, MapPin, Sprout, Settings, User, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  labelHindi: string;
  labelTelugu: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: "home",
    icon: <Home className="w-6 h-6" />,
    label: "Home",
    labelHindi: "होम",
    labelTelugu: "హోమ్",
  },
  {
    id: "weather",
    icon: <MapPin className="w-6 h-6" />,
    label: "Weather",
    labelHindi: "मौसम",
    labelTelugu: "వాతావరణం",
  },
  {
    id: "crops",
    icon: <Sprout className="w-6 h-6" />,
    label: "Crops",
    labelHindi: "फसलें",
    labelTelugu: "పంటలు",
  },
  {
    id: "market",
    icon: <DollarSign className="w-6 h-6" />,
    label: "Market",
    labelHindi: "बाज़ार",
    labelTelugu: "మార్కెట్",
  },
  {
    id: "profile",
    icon: <User className="w-6 h-6" />,
    label: "Profile",
    labelHindi: "प्रोफाइल",
    labelTelugu: "ప్రొఫైల్",
  },
  {
    id: "settings",
    icon: <Settings className="w-6 h-6" />,
    label: "Settings",
    labelHindi: "सेटिंग्स",
    labelTelugu: "సెట్టింగ్స్",
  },
];

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: string;
}

export function MobileNavigation({ activeTab, onTabChange, language }: MobileNavigationProps) {
  const getLocalizedLabel = (item: NavigationItem) => {
    switch (language) {
      case "hi":
        return item.labelHindi;
      case "te":
        return item.labelTelugu;
      default:
        return item.label;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-elevated z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "flex flex-col items-center justify-center min-w-0 flex-1 py-1 px-2 rounded-lg transition-smooth",
              activeTab === item.id
                ? "text-crop-green bg-crop-light"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <div className={cn(
              "transition-smooth",
              activeTab === item.id && "scale-110"
            )}>
              {item.icon}
            </div>
            <span className="text-xs font-medium mt-1 truncate">
              {getLocalizedLabel(item)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}