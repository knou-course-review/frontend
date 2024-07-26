type LabelProps = {
  text: string;
  background: string;
};

export default function Label({ text, background }: LabelProps) {
  return <div className={`text-center text-white px-4 py-2 rounded-full ${background}`}>{text}</div>;
}
