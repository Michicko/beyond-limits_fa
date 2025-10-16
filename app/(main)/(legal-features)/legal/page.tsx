import LegalComp from "@/components/main/Layouts/LegalComp";
import React from "react";

const legalDoc = {
  title: "LEGAL NOTICE",
  introText:
    "Beyond Limits Football Academy (BLFA) operates this website to provide information about our programs, services, and activities. By accessing this website, you agree to the following terms:",
  infos: [
    {
      title: "",
      options: [
        "Accuracy of Information: While we strive to keep all information up-to-date and accurate, BLFA does not guarantee the completeness or reliability of any content.",
        "External Links: Our website may contain links to third-party websites. BLFA is not responsible for the content, privacy policies, or practices of these external sites.",
        "Intellectual Property: All content on this website, including logos, text, images, and videos, is the property of BLFA unless stated otherwise. Unauthorized use or reproduction is prohibited.",
        "Limitation of Liability:BLFA is not liable for any damages resulting from the use or inability to use this website, including technical issues, inaccuracies, or external links.",
      ],
    },
  ],
  endNote:
    "For further inquiries, please contact us at contact@beyondlimitsfa.com",
};

function legal() {
  return (
    <LegalComp
      title={legalDoc.title}
      infos={legalDoc.infos}
      introText={legalDoc.introText}
      endNote={legalDoc.endNote}
    />
  );
}

export default legal;
