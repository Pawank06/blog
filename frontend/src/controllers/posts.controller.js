/**************************** Get All Posts ******************************/


const getPosts = async () => {
  const res = await fetch("http://localhost:4000/api/posts");
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

/**************************** Get Users Posts ******************************/
const getUserPosts = async () => {
  const res = await fetch("http://localhost:4000/api/posts/user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

/**************************** Getting Single Post ******************************/

const getSinglePost = async (id) => {
  const res = await fetch(`http://localhost:4000/api/posts/post/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;

}


/**************************** Create Posts ******************************/
const createPost = async (title, body) => {
  if (!title || !body) {
    throw Error("All feilds are requires");
  }

  const res = await fetch("http://localhost:4000/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title, body }),
  });

  const data = await res.json();


  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

/**************************** Create Posts ******************************/
const deletePost = async (_id) => {
  const res = await fetch(`http://localhost:4000/api/posts/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


  const data = await res.json();


  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

/**************************** Update Posts ******************************/

const updatePost = async (_id, title, body) => {
  if (!title || !body) {
    throw Error("All feilds are requires");
  }

  const res = await fetch(`http://localhost:4000/api/posts/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title, body }),
  })


  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
}

export { getPosts, getUserPosts, createPost, deletePost, updatePost, getSinglePost };

