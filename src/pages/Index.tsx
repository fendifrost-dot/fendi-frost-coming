import { Snowflake } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Subtle frost circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative z-10 text-center space-y-6 max-w-md">
        <Snowflake className="w-10 h-10 text-accent mx-auto animate-pulse-glow" />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          FendiFrost
        </h1>
        <div className="h-px w-16 bg-primary mx-auto" />
        <p className="text-muted-foreground text-lg">
          Something cool is on the way.
        </p>
        <p className="text-muted-foreground/60 text-sm">Under Construction</p>
      </div>
    </div>
  );
};

export default Index;
