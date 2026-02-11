import { BharatData } from "../types/location.types";

export const bharatData: BharatData = {
  states: [
    {
      id: "rajasthan",
      name: "Rajasthan",
      nickname: "Land of Kings",
      summary: "A land of forts, deserts, and royal heritage.",
      climate: "Hot desert climate with extreme summers.",
      bestTimeToVisit: "October to March",
      landmarks: ["Amer Fort", "Jaisalmer Fort", "Hawa Mahal"],
      districts: [
        {
          id: "jaipur",
          name: "Jaipur",
          categories: {
            history: {
              title: "Royal History",
              description: "Founded by Maharaja Sawai Jai Singh II in 1727.",
            },
            architecture: {
              title: "Pink City Design",
              description: "Famous for pink sandstone buildings.",
            },
            famousFor: {
              title: "Tourism & Crafts",
              description: "Jewelry, textiles, and forts.",
            }
          }
        }
      ]
    }
  ]
};
