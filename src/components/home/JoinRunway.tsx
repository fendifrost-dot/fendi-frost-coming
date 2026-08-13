import Eyebrow from "@/components/Eyebrow";
import EmailSignup from "@/components/EmailSignup";

const JoinRunway = () => {
  return (
    <section className="border-t border-border/30 py-24 sm:py-32">
      <div className="container max-w-xl mx-auto text-center">
        <Eyebrow className="justify-center flex">Join the Runway</Eyebrow>
        <h2 className="font-serif text-4xl sm:text-5xl leading-tight">Enter the Runway</h2>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Get early music, unreleased visuals, private drops and updates directly from Fendi Frost.
        </p>
        <EmailSignup campaign="home_join_the_runway" className="mt-10" />
      </div>
    </section>
  );
};

export default JoinRunway;
