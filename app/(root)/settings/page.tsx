import RelativeTime from "@/components/RelativeTime";
import React from "react";

const Settings = () => {
  const eventTimestamp = '2025-02-17T01:00:00'; // Replace with an actual timestamp

  return (
    <div>
      <h1>Event occurred</h1>
      <p>Event happened <RelativeTime timestamp={eventTimestamp} /></p>
    </div>
  );
};

export default Settings;
