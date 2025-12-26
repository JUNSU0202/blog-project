// src/types/post.ts
export interface Post{   // 읽어온게시글데이터타입정의
id: number;
title: string;
category: string;
author: string;
username: string;
thumbnail: string;
desc: string;
regdate: Date;
}