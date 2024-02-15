const PostApiKey = import.meta.env.VITE_POST_URI


/**************************** Get All Posts ******************************/


const getPosts = async () => {
  const res = await fetch(`${PostApiKey}`);
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

/**************************** Get Users Posts ******************************/
const getUserPosts = async () => {
  const res = await fetch(`${PostApiKey}/user`, {
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
  const res = await fetch(`${PostApiKey}/post/${id}`);
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

  const res = await fetch(`${PostApiKey}`, {
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
  const res = await fetch(`${PostApiKey}/${_id}`, {
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

  const res = await fetch(`${PostApiKey}/${_id}`, {
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

