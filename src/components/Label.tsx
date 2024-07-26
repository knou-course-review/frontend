type LabelProps = {
  text: string;
  background: string;
  display?: string;
};

export default function Label({ text, background, display = "block" }: LabelProps) {
  return <div className={`text-center text-white px-4 py-2 rounded-full ${display} ${background}`}>{text}</div>;
}
