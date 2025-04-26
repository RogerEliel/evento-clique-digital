
interface FooterProps {
  additionalText?: string;
}

export function Footer({ additionalText }: FooterProps) {
  return (
    <footer className="bg-white p-4 border-t mt-auto">
      <div className="text-center text-gray-600">
        &copy; {new Date().getFullYear()} Photography Platform
        {additionalText && ` - ${additionalText}`}
      </div>
    </footer>
  );
}
