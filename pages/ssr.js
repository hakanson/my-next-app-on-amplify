// pages/ssr.js
export default function SSR({ formattedDate }) {
  return (
    <>
      <h1>Server-side rendered page</h1>
      <p>
        This page is server-side rendered. It was rendered on {formattedDate}.
      </p>
      <p>
        <a href="/">View a static page.</a>
      </p>
    </>
  );
}

export async function getServerSideProps(context) {
  const renderDate = Date.now();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "long",
  }).format(renderDate);
  console.log(
    `SSR ran on ${formattedDate}. This will be logged in CloudWatch.`
  );

  // https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-runtime
  console.log(process.env); 

  // https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter
  console.log(context); 

  // called from https://github.com/vercel/next.js/blob/canary/packages/next/server/render.tsx#L367
  // var err = new Error();
  // console.log(err.stack);

  return { props: { formattedDate } };
}