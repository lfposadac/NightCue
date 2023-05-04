import Link from "next/link";
import Image from "next/image";
import styles from './listofpost.module.css';
import { LikeButton } from "./LikeButton";
import data from "./data.json";

export async function ListOfPosts() {
  console.log("data");
  console.log(data);

  return data.slice(0, 5).map((post) => (
    <article className={styles.post} key={post.id}>
      <Link href="/posts/[id]" as={`/posts/${post.id}`}>
        <h2 className={styles.title}>{post.title}</h2>
      </Link>
      <Image className={styles.imagen}
        src={post.image}
        alt="Descripción de la imagen"
        width={250}
        height={250}
      />
      <p className={styles.desc}>{post.description}</p>
      <LikeButton id={post.id} />
    </article>
  ));
}
