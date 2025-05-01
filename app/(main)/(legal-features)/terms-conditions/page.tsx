import LegalComp from "@/components/main/Layouts/LegalComp";
import React from "react";

const terms = {
  title: "Terms & Conditions",
  introText:
    "Welcome to Beyond Limits Football Academy—where passion meets purpose. By using our website, you’re agreeing to play by the rules below. So, lace up and let's get started.",
  infos: [
    {
      title: "Who We Are",
      options: [
        "We're a football academy dedicated to developing the next generation of stars. This website is your go-to for news, programs, and everything Beyond Limits.",
      ],
    },
    {
      title: "Using Our Website",
      options: [
        "You can browse, read, and share—but don't copy, modify, or republish our content without permission.",
        "Respect other users and keep interactions positive. No foul play here!",
      ],
    },
    {
      title: "Your Info",
      options: [
        "When you sign up or contact us, you're sharing your info. Check out our Confidentiality Policy to see how we handle it.",
      ],
    },
    {
      title: "Third-Party Links",
      options: [
        "We might link to other cool sites, but we're not responsible for their content. Click at your own risk!",
      ],
    },
    {
      title: "Changes to These Terms",
      options: [
        "We may tweak these rules from time to time. Keep an eye out for updates, and by continuing to use the site, you're cool with any changes.s",
      ],
    },
  ],
  endNote:
    "Got questions? Want to report an issue? Reach out at info@beyondlimitsfa.com",
};

function TermsConditions() {
  return (
    <LegalComp
      title={terms.title}
      infos={terms.infos}
      introText={terms.introText}
      endNote={terms.endNote}
    />
  );
}

export default TermsConditions;
