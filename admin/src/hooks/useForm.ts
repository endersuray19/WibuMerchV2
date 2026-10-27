"use client"
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

interface tabelForm {
  tabel?: string;
  endpointEdit: string;
  endpointAdd: string;
  path: string;
  idData: string;
  dataImage?: string;
  titleTable:string;
}


export default function useForm({ tabel, endpointEdit, endpointAdd, dataImage, path, idData,titleTable }: tabelForm) {
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string>(dataImage || "")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)

    const formElement = e.currentTarget;
    const formData = new FormData(formElement)

    if (tabel) {
      formData.append("id", idData);
    }
    Swal.fire({
      title: "Submiting...",
      text: "Please wait while your data is being submitted",
      icon: "info",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    try {
      let response
      if (tabel) {
        response = await api.post(`${endpointEdit}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      }
      else {
        response = await api.post(`${endpointAdd}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      }
      if (response.data.success) {
        await Swal.fire({

          icon: "success",
          title: "Success",
          text: tabel ? `${titleTable} updated successfully!` : `${titleTable} added successfully!`
        });
        toast.success(tabel ? `${titleTable} updated successfully!` : `${titleTable} added successfully!`)
        router.push(path);
        router.refresh()
      } else {
        throw new Error(response.data.message || "Failed to input data")
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || error.message || "There is something wrong!",
        icon: "error",
      });
    }
    finally{
      setLoading(false)
    }
  }
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file))
    }
  }
  return{
    handleSubmit,handleFileChange,imagePreview,selectedFile,loading
  }

}
