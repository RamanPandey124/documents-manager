import { documentSchema } from "./types/tree";

export const data: Array<documentSchema> = [
    {
        id: "1",
        path: ".next",
        name: ".next",
        contentType: "directory",
        parent: "tree"
    },
    {
        id: "2",
        path: "node_modules",
        name: "node_modules",
        contentType: "directory",
        parent: "tree"
    },
    {
        id: "3",
        path: "public",
        name: "public",
        contentType: "directory",
        parent: "tree"
    },
    {
        id: "4",
        path: "src",
        name: "src",
        contentType: "directory",
        parent: "tree"
    },
    {
        id: "4",
        path: ".eslintrc.json",
        name: ".eslintrc.json",
        contentType: "file",
        parent: "tree"
    },
    {
        id: "5",
        path: ".gitignore",
        name: ".gitignore",
        contentType: "file",
        parent: "tree"
    },
    {
        id: "6",
        path: "next-env.d.ts",
        name: "next-env.d.ts",
        contentType: "file",
        parent: "tree"
    },
    {
        id: "7",
        path: "nextconfig.ts",
        name: "nextconfig.ts",
        contentType: "file",
        parent: "tree"
    },
    {
        id: "8",
        path: "package.json",
        name: "package.json",
        contentType: "file",
        parent: "tree"
    },
    {
        id: "9",
        path: "/public/next.svg",
        name: "next.svg",
        contentType: "file",
        parent: "tree/public"
    },
    {
        id: "10",
        path: "public/vercel.svg",
        name: "vercel.svg",
        contentType: "file",
        parent: "tree/public"
    },
    {
        id: "11",
        path: "src/app",
        name: "app",
        contentType: "directory",
        parent: "tree/src"
    },
    {
        id: "12",
        path: "src/components",
        name: "components",
        contentType: "directory",
        parent: "tree/src"
    },
    {
        id: "13",
        path: "src/lib",
        name: "lib",
        contentType: "directory",
        parent: "tree/src"
    },
    {
        id: "14",
        path: "src/app/tree",
        name: "tree",
        contentType: "directory",
        parent: "tree/src/app"

    },
    {
        id: "15",
        path: "src/app/global.css",
        name: "global.css",
        contentType: "file",
        parent: "tree/src/app"
    },
    {
        id: "15",
        path: "src/app/layout.tsx",
        name: "layout.tsx",
        contentType: "file",
        parent: "tree/src/app"
    },
    {
        id: "16",
        path: "src/app/page.tsx",
        name: "page.tsx",
        contentType: "file",
        parent: "tree/src/app"
    },
    {
        id: "17",
        path: "src/app/tree/page.tsx",
        name: "page.tsx",
        contentType: "file",
        parent: "tree/src/app/tree"
    },
    {
        id: "18",
        path: "src/components/file.tsx",
        name: "file.tsx",
        contentType: "file",
        parent: "tree/src/components"
    },
    {
        id: "19",
        path: "src/components/folder.tsx",
        name: "folder.tsx",
        contentType: "file",
        parent: "tree/src/components"
    },
    {
        id: "20",
        path: "src/components/TreeExample.tsx",
        name: "TreeExample.tsx",
        contentType: "file",
        parent: "tree/src/components"
    },
    {
        id: "21",
        path: "src/lib/data.js",
        name: "data.js",
        contentType: "file",
        parent: "tree/src/lib"
    },
    {
        id: "22",
        path: "src/app/tree/git",
        name: "git",
        contentType: "directory",
        parent: "tree/src/app/tree"
    },
    {
        id: "22",
        path: "src/app/tree/sample",
        name: "sample",
        contentType: "directory",
        parent: "tree/src/app/tree"
    },
    {
        id: "23",
        path: "src/app/tree/git/layout.tsx",
        name: "layout.tsx",
        contentType: "file",
        parent: "tree/src/app/tree/git"
    },
]