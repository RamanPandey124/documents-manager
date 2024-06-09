interface documentSchema {
    id: string;
    name: string;
    path: string;
    contentType: "directory" | "file"
}

export const data: Array<documentSchema> = [
    {
        id: "1",
        path: "",
        name: ".next",
        contentType: "directory"
    },
    {
        id: "2",
        path: "",
        name: "node_modules",
        contentType: "directory"
    },
    {
        id: "3",
        path: "",
        name: "public",
        contentType: "directory"
    },
    {
        id: "4",
        path: "",
        name: "src",
        contentType: "directory"
    },
    {
        id: "4",
        path: "",
        name: ".eslintrc.json",
        contentType: "file"
    },
    {
        id: "5",
        path: "",
        name: ".gitignore",
        contentType: "file"
    },
    {
        id: "6",
        path: "",
        name: "next-env.d.ts",
        contentType: "file"
    },
    {
        id: "7",
        path: "",
        name: "nextconfig.ts",
        contentType: "file"
    },
    {
        id: "8",
        path: "",
        name: "package.json",
        contentType: "file"
    },
    {
        id: "9",
        path: "/public",
        name: "next.svg",
        contentType: "file"
    },
    {
        id: "10",
        path: "/public/",
        name: "vercel.svg",
        contentType: "file"
    },
    {
        id: "11",
        path: "/src",
        name: "app",
        contentType: "directory"
    },
    {
        id: "12",
        path: "/src",
        name: "components",
        contentType: "directory"
    },
    {
        id: "13",
        path: "/src",
        name: "lib",
        contentType: "directory"
    },
    {
        id: "14",
        path: "/src/app",
        name: "tree",
        contentType: "directory"
    },
    {
        id: "15",
        path: "/src/app",
        name: "global.css",
        contentType: "file"
    },
    {
        id: "15",
        path: "/src/app",
        name: "layout.tsx",
        contentType: "file"
    },
    {
        id: "16",
        path: "/src/app/",
        name: "page.tsx",
        contentType: "file"
    },
    {
        id: "17",
        path: "/src/app/tree",
        name: "page.tsx",
        contentType: "file"
    },
    {
        id: "18",
        path: "/src/components",
        name: "file.tsx",
        contentType: "file"
    },
    {
        id: "19",
        path: "/src/components",
        name: "folder.tsx",
        contentType: "file"
    },
    {
        id: "20",
        path: "/src/components",
        name: "TreeExample.tsx",
        contentType: "file"
    },
    {
        id: "21",
        path: "/src/lib",
        name: "data.js",
        contentType: "file"
    },
    {
        id: "22",
        path: "/src/app/tree",
        name: "git",
        contentType: "directory"
    },
    {
        id: "22",
        path: "/src/app/tree",
        name: "sample",
        contentType: "directory"
    },
    {
        id: "23",
        path: "/src/app/tree/git",
        name: "layout.tsx",
        contentType: "file"
    },
]