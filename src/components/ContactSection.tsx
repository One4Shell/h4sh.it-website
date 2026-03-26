import React, { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export const ContactSection: React.FC = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", { hideEventTypeDetails: true, layout: "week_view" });
    })();
  }, []);

  return (
    <div className="w-full h-[600px] md:h-[1500px] rounded-[2.5rem] overflow-hidden glass-card">
      <Cal
        namespace="15min"
        calLink="lorenzo-fornara-kptoob/15min"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "week_view", useSlotsViewOnSmallScreen: false }}
      />
    </div>
  );
};
