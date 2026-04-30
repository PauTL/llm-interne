import PropositionCards from "@/components/mockup/Proposition_Cards";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "hsl(220, 20%, 94%)" }}>
      <div className="flex-1 p-4">
        <div className="h-[calc(100vh-32px)]">
          <PropositionCards />
        </div>
      </div>
    </div>
  );
};

export default Index;
