import LegalComp from "@/components/main/Layouts/LegalComp";
import React from "react";

const confi = {
  title: "Confidentiality Policy",
  introText:
    "At Beyond Limits Football Academy, we're all about trust—on and off the pitch. When you visit our site or share your details with us, we treat your information like a prized possession (think of it as the game-winning ball).",
  infos: [
    {
      title: "What We Collect:",
      options: [
        "Your name, contact details, and any info you share when signing up for updates, events, or programs.",
        "Technical stuff like IP addresses, browser type, and how you interact with our website (just to make your experience smoother).",
      ],
    },
    {
      title: "How We Use It:",
      options: [
        "To keep you in the loop about academy news, matches, and opportunities.",
        "To improve our site and make sure everything runs like a well-oiled midfield.",
        "We never sell or share your info with third parties unless it’s essential (like processing payments or legal reasons).",
      ],
    },
    {
      title: "Your Privacy, Your Rules",
      options: [
        "You can request to see, update, or delete your info anytime. Just drop us a line!",
        "We protect your data with top-notch security, but if you notice anything fishy, let us know.",
      ],
    },
  ],
  endNote:
    "By using our site, you're cool with how we handle your info. Got questions? Hit us up at contact@beyondlimitsfa.com",
};

function Confidential() {
  return (
    <LegalComp
      title={confi.title}
      infos={confi.infos}
      introText={confi.introText}
      endNote={confi.endNote}
    />
  );
}

export default Confidential;
