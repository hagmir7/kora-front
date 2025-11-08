const SocialMediaButton = ({ icon, label, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 w-15">
    <div className="flex flex-col gap-y-2 items-center">
      <div className="w-15 h-15 bg-gray-100 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div className="text-xs text-center line-clamp-1">{label}</div>
    </div>
  </a>
);

export default SocialMediaButton;