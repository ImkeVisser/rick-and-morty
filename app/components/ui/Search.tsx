interface SearchProps {
    onChange: (value: string) => void;
    label: string
  }
  
  export default function SearchBar({ onChange, label }: SearchProps) {
    return (
      <div className="mb-12 flex flex-col items-center">
      <label className="text-lg mb-4" htmlFor="search">{label}</label>
      <input 
        type="text" 
        id="search" 
        placeholder="Search..."
        className="w-full bg-transparent p-2 border-b-2 border-green-600 outline-none focus:border-blue-400" 
        onChange={(e) => onChange(e.target.value)}
      />
  </div>
    );
  }