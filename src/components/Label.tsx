type LabelProps = {
  text: string;
  background: string;
  display?: string;
};

export default function Label({ text, background, display = "block" }: LabelProps) {
  return <div className={`px-3 sm:px-4 py-1 rounded-full text-center text-sm sm:text-base text-white ${display} ${background}`}>{text}</div>;
}
