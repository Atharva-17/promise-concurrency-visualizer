"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Select, SelectItem } from "@nextui-org/select";
import { numArr, promises } from "@/config/constants";
import React from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Radio, RadioGroup } from "@nextui-org/radio";

export default function Home() {
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

  console.log(delayTimePromise1, delayTimePromise2, delayTimePromise3)

  const promisesArr: any[] = [
    {
      name: "Promise One",
      delayTime: delayTimePromise1,
      setDelayTime: setDelayTimePromise1,
      status: statusPromise1,
      setStatus: setStatusPromise1,
      color: "border-red-500",
    },
    {
      name: "Promise Two",
      delayTime: delayTimePromise2,
      setDelayTime: setDelayTimePromise2,
      status: statusPromise2,
      setStatus: setStatusPromise2,
      color: "border-purple-500",
    },
    {
      name: "Promise Three",
      delayTime: delayTimePromise3,
      setDelayTime: setDelayTimePromise3,
      status: statusPromise3,
      setStatus: setStatusPromise3,
      color: "border-orange-500",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Promise Concurrency Visualizer</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          See the Flow, Optimize the Load
        </h2>
      </div>
      <Select
        items={promises}
        label="Select Promise concurrency type"
        className="max-w-md"
        onChange={handleSelectionChange}
        selectedKeys={[value]}
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
            <div className="text-default-500 text-small">
              {item.value === value && (
                <>
                  <Code>
                    <p className="font-bold">{item.value}</p>
                    <br />
                    {item.desc}
                  </Code>
                </>
              )}
            </div>
          </>
        ))}
      </div>

      <div className="w-full max-w-md">
        <ButtonGroup fullWidth>
          <Button variant="bordered" className="font-medium" color="danger">
            Clear
          </Button>
          <Button variant="bordered" className="font-medium" color="warning">
            Reset
          </Button>
          <Button className="font-medium" color="primary">
            Start
          </Button>
        </ButtonGroup>
      </div>

      <div className="max-w-lg w-full space-y-4">
        {promisesArr.map((item, index) => (
          <div key={index} className="bg-default-100 p-4 rounded-lg ">
            <p className="text-lg font-medium">{item.name}</p>
            <div className="flex gap-3 mt-3">
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
              <RadioGroup orientation="horizontal" value={item.status}
        onValueChange={item.setStatus}>
                <Radio value="resolve" >Resolve</Radio>
                <Radio value="reject">Reject</Radio>
              </RadioGroup>
            </div>
            <div className="mt-4 flex gap-1">
              <div className={`border-l-3 h-6 ${item.color}`}></div>
              <div className={`border-l-3 h-6 ${item.color}`}></div>
              <div className={`border-l-3 h-6 ${item.color}`}></div>
              <div className={`border-l-3 h-6 ${item.color}`}></div>
            </div>
            <p className="mt-1 font-medium">2 sec</p>
          </div>
        ))}

      </div>
    </section>
  );
}
