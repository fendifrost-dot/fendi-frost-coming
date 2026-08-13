import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { fanSignupUrl } from "@/config/site";
import { track } from "@/lib/analytics";
import { Check } from "lucide-react";

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  email: z.string().trim().email("Enter a valid email address").max(200),
});

type FormValues = z.infer<typeof schema>;

interface EmailSignupProps {
  campaign?: string;
  className?: string;
}

const EmailSignup = ({ campaign = "join_the_runway", className }: EmailSignupProps) => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const payload = { ...values, source: campaign, ts: new Date().toISOString() };

    // TODO: wire to Supabase/Lovable. This currently posts to an env-configured
    // endpoint (VITE_FAN_SIGNUP_URL). Without that env var set, it optimistically
    // shows success and logs the payload for local/dev visibility.
    if (fanSignupUrl) {
      try {
        const res = await fetch(fanSignupUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Signup endpoint responded ${res.status}`);
      } catch (err) {
        console.error("Fan signup failed", err);
        toast.error("Something went wrong. Please try again.");
        return;
      }
    } else {
      console.info("[EmailSignup] VITE_FAN_SIGNUP_URL not set — payload:", payload);
    }

    track("fan_signup", { campaign });
    toast.success("You're in. Welcome to the Runway.");
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className={className}>
        <div className="flex items-center gap-3 text-gold">
          <Check className="h-5 w-5" />
          <p className="text-sm uppercase tracking-[0.15em]">You're on the list.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="First name"
            aria-label="First name"
            className="rounded-none border-border/50 bg-transparent h-12 focus-visible:ring-gold"
            {...register("firstName")}
          />
          {errors.firstName && <p className="mt-1 text-xs text-destructive">{errors.firstName.message}</p>}
        </div>
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            className="rounded-none border-border/50 bg-transparent h-12 focus-visible:ring-gold"
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 rounded-none bg-gold text-background hover:bg-gold/90 uppercase text-xs tracking-[0.2em] px-8"
        >
          {isSubmitting ? "Sending..." : "Enter"}
        </Button>
      </div>
    </form>
  );
};

export default EmailSignup;
