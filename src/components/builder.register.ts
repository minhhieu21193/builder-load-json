"use client";

import { builder } from "@builder.io/react";
import DynamicSection from "./DynamicSection";

builder.registerComponent(DynamicSection, {
  name: "DynamicSection",
  inputs: [
    { name: "title", type: "string" },
    { name: "config", type: "object" },
  ],
});
