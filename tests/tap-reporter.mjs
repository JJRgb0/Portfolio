export default class TapReporter {
  count = 0;

  onBegin() {
    console.log("TAP version 13");
  }

  onTestEnd(test, result) {
    const pass = result.status === "passed";
    const skip = result.status === "skipped";
    const marker = skip ? " # SKIP" : "";
    console.log(
      `${pass || skip ? "ok" : "not ok"} ${++this.count} - ${test.title}${marker}`,
    );
    if (result.error?.message)
      console.log(`# ${result.error.message.replaceAll("\n", "\n# ")}`);
  }

  onEnd() {
    console.log(`1..${this.count}`);
  }
}
