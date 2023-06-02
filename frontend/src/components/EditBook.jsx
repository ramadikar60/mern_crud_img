import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();

    useEffect(() => {
        getBookById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getBookById = async() => {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        setTitle(response.data.name);
        setFile(response.data.image);
        setPreview(response.data.url);
    }

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  }

  const updateBook = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    try {
      await axios.patch(`http://localhost:5000/books/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-1/2 m-auto mt-20 bg-gray'>
        
             
      <form onSubmit={updateBook}>
        <div class="mb-6">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Nama Buku</label>
          <input type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan nama buku" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark file-cta" for="image">Upload Image</label>
        <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file-input" aria-describedby="image_help" id="image" type="file" onChange={loadImage} />

        {preview ? (
          <figure className='image'>
            <img className='max-w-md h-auto mt-3' src={preview} alt="Preview book" />
          </figure>
        ): (
          ""
        )}

        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
      </form>

    </div>
  )
}

export default EditBook