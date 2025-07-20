import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from "~/components/Accordion";
import { cn } from "~/lib/utils";

// Helper Components
interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const bgColor = score > 70 
    ? 'bg-green-100' 
    : score > 49 
      ? 'bg-yellow-100' 
      : 'bg-red-100';

  const textColor = score > 70 
    ? 'text-green-600' 
    : score > 49 
      ? 'text-yellow-600' 
      : 'text-red-600';

  return (
    <div className={cn("px-3 py-1 rounded-full flex items-center gap-1", bgColor)}>
      {score > 70 && (
        <img src="/icons/check.svg" alt="check" className="w-4 h-4" />
      )}
      <span className={cn("font-medium", textColor)}>
        {score}/100
      </span>
    </div>
  );
};

interface CategoryHeaderProps {
  title: string;
  categoryScore: number;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, categoryScore }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <h3 className="text-lg font-medium">{title}</h3>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation: string;
}

interface CategoryContentProps {
  tips: Tip[];
}

const CategoryContent: React.FC<CategoryContentProps> = ({ tips }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start gap-2">
            <img 
              src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"} 
              alt={tip.type} 
              className="w-5 h-5 mt-0.5" 
            />
            <span className="text-sm">{tip.tip}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className={cn(
              "p-3 rounded-lg text-sm", 
              tip.type === "good" 
                ? "bg-green-50 border border-green-100" 
                : "bg-amber-50 border border-amber-100"
            )}
          >
            <p>{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
interface DetailsProps {
  feedback: Feedback;
}

const Details: React.FC<DetailsProps> = ({ feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full p-4 mt-4">
      <h2 className="text-2xl font-bold mb-4">Detailed Feedback</h2>

      <Accordion className="space-y-4">
        <AccordionItem id="tone-style" className="border rounded-lg p-2">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader 
              title="Tone & Style" 
              categoryScore={feedback.toneAndStyle.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="content" className="border rounded-lg p-2">
          <AccordionHeader itemId="content">
            <CategoryHeader 
              title="Content" 
              categoryScore={feedback.content.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="structure" className="border rounded-lg p-2">
          <AccordionHeader itemId="structure">
            <CategoryHeader 
              title="Structure" 
              categoryScore={feedback.structure.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills" className="border rounded-lg p-2">
          <AccordionHeader itemId="skills">
            <CategoryHeader 
              title="Skills" 
              categoryScore={feedback.skills.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
