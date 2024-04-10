"use client";

import { Link } from "@nextui-org/link";
import { title, subtitle } from "@/components/primitives";
import { Select, SelectItem } from "@nextui-org/select";
import { numArr, promises } from "@/config/constants";
import React from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { Spinner } from "@nextui-org/spinner";
import { ThemeSwitch } from "@/components/theme-switch";
import { OctagonX, RotateCcw, Sparkles } from "lucide-react";

export default function Home() {
  const [loader, setLoader] = React.useState<boolean>(false);

  //   promisetype
  const [value, setValue] = React.useState<string>("Promise.all()");

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const [delayTimePromise1, setDelayTimePromise1] = React.useState<string>("2");
  const [delayTimePromise2, setDelayTimePromise2] = React.useState<string>("2");
  const [delayTimePromise3, setDelayTimePromise3] = React.useState<string>("2");
  const [statusPromise1, setStatusPromise1] = React.useState<string>("resolve");
  const [statusPromise2, setStatusPromise2] = React.useState<string>("resolve");
  const [statusPromise3, setStatusPromise3] = React.useState<string>("resolve");
  const [result, setResult] = React.useState<string>("");
  const [promiseVerdict, setPromiseVerdict] = React.useState<string>("");

  const promisesArr: any[] = [
    {
      name: "Promise One",
      delayTime: delayTimePromise1,
      setDelayTime: setDelayTimePromise1,
      status: statusPromise1,
      setStatus: setStatusPromise1,
      color: "border-red-500",
      progressBar: "bar1",
      timerElement: "timer1",
    },
    {
      name: "Promise Two",
      delayTime: delayTimePromise2,
      setDelayTime: setDelayTimePromise2,
      status: statusPromise2,
      setStatus: setStatusPromise2,
      color: "border-purple-500",
      progressBar: "bar2",
      timerElement: "timer2",
    },
    {
      name: "Promise Three",
      delayTime: delayTimePromise3,
      setDelayTime: setDelayTimePromise3,
      status: statusPromise3,
      setStatus: setStatusPromise3,
      color: "border-orange-500",
      progressBar: "bar3",
      timerElement: "timer3",
    },
  ];

  const clear = () => {
    const progressBar1 = document.getElementById("bar1");
    const progressBar2 = document.getElementById("bar2");
    const progressBar3 = document.getElementById("bar3");
    const timer1 = document.getElementById("timer1");
    const timer2 = document.getElementById("timer2");
    const timer3 = document.getElementById("timer3");
    const resultTimer = document.getElementById("resultTimer");
    const resultProgressBar = document.getElementById("resultProgressBar");

    if (progressBar1) {
      progressBar1.innerHTML = "";
    }
    if (progressBar2) {
      progressBar2.innerHTML = "";
    }
    if (progressBar3) {
      progressBar3.innerHTML = "";
    }
    if (timer1) {
      timer1.innerHTML = "";
    }
    if (timer2) {
      timer2.innerHTML = "";
    }
    if (timer3) {
      timer3.innerHTML = "";
    }

    if (resultTimer) {
      resultTimer.innerHTML = "";
    }

    if (resultProgressBar) {
      resultProgressBar.innerHTML = "";
    }
    setPromiseVerdict("");
    setResult("");
  };

  const clearFn = () => {
    const progressBar1 = document.getElementById("bar1");
    const progressBar2 = document.getElementById("bar2");
    const progressBar3 = document.getElementById("bar3");
    const timer1 = document.getElementById("timer1");
    const timer2 = document.getElementById("timer2");
    const timer3 = document.getElementById("timer3");
    const resultTimer = document.getElementById("resultTimer");
    const resultProgressBar = document.getElementById("resultProgressBar");

    if (progressBar1) {
      progressBar1.innerHTML = "";
    }
    if (progressBar2) {
      progressBar2.innerHTML = "";
    }
    if (progressBar3) {
      progressBar3.innerHTML = "";
    }
    if (timer1) {
      timer1.innerHTML = "";
    }
    if (timer2) {
      timer2.innerHTML = "";
    }
    if (timer3) {
      timer3.innerHTML = "";
    }

    if (resultTimer) {
      resultTimer.innerHTML = "";
    }

    if (resultProgressBar) {
      resultProgressBar.innerHTML = "";
    }

    setLoader(false);
    setPromiseVerdict("");
    setResult("");
  };

  const reset = () => {
    window.location.reload();
  };

  const start = () => {
    setLoader(true);
    clear();
    const getP = (
      delayTime: any,
      status: string,
      promiseName: string,
      progressBarId: string,
      timeElementId: string,
      color: string
    ): Promise<string> => {
      return new Promise<string>((resolve, reject) => {
        let time = 0;
        let timer = setInterval(() => {
          const progressBarElement = document.getElementById(progressBarId);
          if (progressBarElement) {
            progressBarElement.className = color;
            progressBarElement.innerHTML += "|";
          }
          time++;
          const timeElement = document.getElementById(timeElementId);
          if (timeElement) {
            timeElement.innerText = `${time / 10} sec`;
          }
        }, 100);

        setTimeout(() => {
          clearInterval(timer);
          if (status === "resolve") {
            resolve(`${promiseName} resolved`);
          } else {
            reject(`${promiseName} rejected`);
          }
        }, delayTime * 1000);
      });
    };

    const promise1 = getP(
      delayTimePromise1,
      statusPromise1,
      "Promise One",
      "bar1",
      "timer1",
      "text-red-500"
    );
    const promise2 = getP(
      delayTimePromise2,
      statusPromise2,
      "Promise Two",
      "bar2",
      "timer2",
      "text-purple-500"
    );
    const promise3 = getP(
      delayTimePromise3,
      statusPromise3,
      "Promise Third",
      "bar3",
      "timer3",
      "text-yellow-500"
    );

    let resultTime = 0;
    let resultTimer = setInterval(() => {
      resultTime++;
      const resultTimer = document.getElementById("resultTimer");
      if (resultTimer) {
        resultTimer.innerHTML = `${resultTime / 10} sec`;
      }
      const resultProgressBar = document.getElementById("resultProgressBar");
      if (resultProgressBar) {
        resultProgressBar.className = "text-success-500";
        resultProgressBar.innerHTML += "|";
      }
    }, 100);

    let promiseFunction;

    switch (value) {
      case "Promise.any()":
        promiseFunction = Promise.any([promise1, promise2, promise3]);
        break;
      case "Promise.race()":
        promiseFunction = Promise.race([promise1, promise2, promise3]);
        break;
      case "Promise.allSettled()":
        promiseFunction = Promise.allSettled([promise1, promise2, promise3]);
        break;
      default:
        promiseFunction = Promise.all([promise1, promise2, promise3]);
    }

    promiseFunction
      .then((res) => {
        clearInterval(resultTimer);
        setResult(JSON.stringify(res));
        setPromiseVerdict("<resolved>");
      })
      .catch((err) => {
        clearInterval(resultTimer);
        setResult(err);
        setPromiseVerdict("<rejected>");
      })
      .finally(() => {
        console.log("Settled");
      });
  };

  return (
    <section className="py-8">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
        <div className="space-y-4">
          <div className="inline-block text-center justify-center">
            <h1 className={title()}>Promise Concurrency Visualizer</h1>
            <h2 className={subtitle({ class: "mt-4" })}>
              See the Flow, Optimize the Load
            </h2>
            <ThemeSwitch />
          </div>
          <Select
            items={promises}
            label="Select Promise concurrency type"
            className=""
            onChange={handleSelectionChange}
            selectedKeys={[value]}
            color="primary"
          >
            {promises.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>

          <div className="">
            {promises.map((item) => (
              <>
                <div key={item.value} className="text-default-500 text-small">
                  {item.value === value && (
                    <>
                      <div className="bg-default-100 p-3 rounded-md">
                        <p className="font-bold">{item.value}</p>
                        <br />
                        {item.desc}
                      </div>
                    </>
                  )}
                </div>
              </>
            ))}
          </div>

          <div className="w-full">
            <ButtonGroup fullWidth>
              <Button
                onClick={clearFn}
                variant="bordered"
                className="font-medium"
                color="danger"
                endContent={<OctagonX size={16} />}
              >
                Clear
              </Button>
              <Button
                onClick={reset}
                variant="bordered"
                className="font-medium"
                color="warning"
                endContent={<RotateCcw size={16} />}
              >
                Reset
              </Button>
              <Button
                onClick={start}
                className="font-medium"
                color="primary"
                endContent={<Sparkles size={16} />}
              >
                Start
              </Button>
            </ButtonGroup>
          </div>
          <div className="bg-default-100 border border-success-500 p-4 rounded-lg ">
            <p className="text-xl font-medium">Result</p>

            <div className="flex gap-2 mt-4">
              <p className="font-semibold">Status:</p>
              {loader && promiseVerdict === "" ? (
                <Spinner size="sm" color="current" />
              ) : (
                <div
                  className={`${
                    promiseVerdict === "<resolved>"
                      ? "text-green-600"
                      : "text-red-600"
                  } font-bold`}
                >
                  {promiseVerdict}
                </div>
              )}
            </div>

            <div className="mt-3">
              <p className="font-semibold">Final Result:</p>
              {loader && result === "" ? (
                <Spinner size="sm" color="current" />
              ) : (
                <div className="w-full bg-default-200 px-1 rounded-md">
                  {result}
                </div>
              )}
            </div>

            <div className="mt-3">
              <div id="resultProgressBar" className="mt-4 flex gap-1"></div>
              <div id="resultTimer" className="mt-1 font-medium"></div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="w-full space-y-4">
            {promisesArr.map((item, index) => (
              <div key={index} className="bg-default-100 p-4 rounded-lg">
                <p className="text-lg font-medium">{item.name}</p>
                <div className="flex justify-around items-center gap-2 mt-3">
                  <Select
                    variant="bordered"
                    items={numArr}
                    label="Select Delay Time"
                    className="max-w-md"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      item.setDelayTime(e.target.value);
                    }}
                    selectedKeys={[item.delayTime]}
                  >
                    {numArr.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <div>
                    <RadioGroup
                      value={item.status}
                      onValueChange={item.setStatus}
                    >
                      <Radio value="resolve">Resolve</Radio>
                      <Radio value="reject">Reject</Radio>
                    </RadioGroup>
                  </div>
                </div>
                <div className="mt-3">
                  <div id={item.progressBar} className="flex gap-1"></div>
                  <div
                    id={item.timerElement}
                    className="mt-1 font-medium"
                  ></div>
                </div>
              </div>
            ))}

            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://atharva-pandhare.netlify.app/"
                title="atharva pandhare"
              >
                <span className="text-default-600">Developed by</span>
                <p className="text-primary">Atharva Pandhare</p>
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
