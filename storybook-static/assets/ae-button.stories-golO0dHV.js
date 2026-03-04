import{b as t}from"./iframe-CXiuOwRO.js";import"./preload-helper-PPVm8Dsz.js";const c={title:"Components/Button",component:"ae-button",tags:["autodocs"],args:{variant:"primary",size:"md",disabled:!1,label:"Button"},argTypes:{variant:{control:{type:"select"},options:["primary","secondary","ghost"]},size:{control:{type:"select"},options:["sm","md","lg"]},disabled:{control:{type:"boolean"}},label:{control:{type:"text"}}},render:e=>t`<ae-button .variant=${e.variant} .size=${e.size} ?disabled=${e.disabled}
      >${e.label}</ae-button
    >`},a={},r={args:{variant:"secondary"}},o={args:{variant:"ghost"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary'
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost'
  }
}`,...o.parameters?.docs?.source}}};const i=["Primary","Secondary","Ghost"];export{o as Ghost,a as Primary,r as Secondary,i as __namedExportsOrder,c as default};
