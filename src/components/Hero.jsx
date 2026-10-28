import { Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">
          <span /> AI JOB OPPORTUNITY AGENT
        </div>

        {/* <h1>
          FIND JOBS.
          <br />
          <em>AUTOMATE</em> THE HUNT.
        </h1> */}
        <h1>FIND JOBS. <em>AUTOMATE</em> THE HUNT.</h1>


        <p>
          Upload your CV, tell us what you’re looking for, and let the agent
          hunt down relevant opportunities.
        </p>
      </div>

      <div className="hero-sticker">
        <Sparkles size={25} />
        <span>
          YOUR NEXT
          <br />
          <b>OPPORTUNITY</b>
        </span>
      </div>
    </section>
  );
}

export default Hero;