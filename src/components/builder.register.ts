"use client";

import { register } from "@builder.io/sdk-react";
import DynamicSection from "./DynamicSection";

// Đăng ký component với Fusion SDK (Gen 2)
register(DynamicSection, {
  name: "DynamicSection",
  inputs: [
    { name: "title", type: "string" },
    { name: "config", type: "object" },
  ],
});
