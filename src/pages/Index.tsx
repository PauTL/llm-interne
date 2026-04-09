import Proposition1 from "@/components/mockup/Proposition1";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "hsl(220, 20%, 8%)" }}>
      <div className="flex-1 px-4 py-4">
        <div className="h-[calc(100vh-32px)]">
          <Proposition1 />
        </div>
      </div>
    </div>
  );
};

export default Index;
