interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-sp-4">
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="mt-sp-2 text-muted-foreground">
        This section will be built in the next step.
      </p>
    </div>
  );
};

export default PlaceholderPage;
