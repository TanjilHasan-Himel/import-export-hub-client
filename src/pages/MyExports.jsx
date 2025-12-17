import { useEffect } from "react";

export default function MyExports() {
  useEffect(() => {
    document.title = "ImportExportHub | My Exports";
  }, []);

  return (
    <div className="container-max py-10">
      <div className="card p-6">
        <h1 className="text-2xl font-black">My Exports</h1>
        <p className="text-white/70 mt-2">
          Placeholder page. Later এখানে user এর export list দেখাবে।
        </p>
      </div>
    </div>
  );
}
