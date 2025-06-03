"use client";

interface Props {
  name?: string;
}

const AppInDevelopment = ({name}: Props) => {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center">
          <div className="text-center">
            <h1 className="text-6xl mb-8">Next I.S. {name}</h1>
            <p>App needs to be developed. You can fork this repo from github and code this app and ask for a pull request.</p>
            <p>Doc is coming soon.</p>
          </div>
      </div>
    </>
  )
}

export default AppInDevelopment;