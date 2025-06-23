export default function PreviewPage({
  searchParams
}: {
  searchParams: { html: string }
}) {
  // If no HTML is provided, show an error message
  if (!searchParams.html) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Error</h1>
          <p>No HTML content provided.</p>
        </div>
      </div>
    );
  }

  return (
    <html dangerouslySetInnerHTML={{ __html: searchParams.html.replace(/^<!DOCTYPE html>/, '') }} />
  );
} 