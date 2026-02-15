interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

const ContextHeader = ({ headline, subtext }: ContextHeaderProps) => {
  return (
    <section className="px-sp-4 pt-sp-5 pb-sp-4">
      <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground">
        {headline}
      </h1>
      <p className="mt-sp-1 text-base text-muted-foreground">
        {subtext}
      </p>
    </section>
  );
};

export default ContextHeader;
