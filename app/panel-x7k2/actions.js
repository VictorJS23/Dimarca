'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function agregarCatalogo(formData) {
  const supabase = await createClient()

  const nombre = formData.get('nombre')
  const pdf = formData.get('pdf')
  const miniatura = formData.get('miniatura')

  if (!nombre || !pdf || !miniatura || pdf.size === 0 || miniatura.size === 0) {
    throw new Error('Faltan datos del catálogo.')
  }

  const rutaPdf = `${Date.now()}-${pdf.name}`
  const { error: errorPdf } = await supabase.storage
    .from('pdfs')
    .upload(rutaPdf, pdf)
  if (errorPdf) {
    throw new Error('No se pudo subir el PDF: ' + errorPdf.message)
  }

  const rutaMiniatura = `${Date.now()}-${miniatura.name}`
  const { error: errorMiniatura } = await supabase.storage
    .from('miniaturas')
    .upload(rutaMiniatura, miniatura)
  if (errorMiniatura) {
    throw new Error('No se pudo subir la miniatura: ' + errorMiniatura.message)
  }

  const { data: pdfUrlData } = supabase.storage.from('pdfs').getPublicUrl(rutaPdf)
  const { data: miniaturaUrlData } = supabase.storage
    .from('miniaturas')
    .getPublicUrl(rutaMiniatura)

  const { error: errorInsert } = await supabase.from('catalogos').insert({
    nombre,
    url_pdf: pdfUrlData.publicUrl,
    url_miniatura: miniaturaUrlData.publicUrl,
    ruta_pdf: rutaPdf,
    ruta_miniatura: rutaMiniatura,
  })

  if (errorInsert) {
    throw new Error('No se pudo guardar el catálogo: ' + errorInsert.message)
  }

  revalidatePath('/')
  revalidatePath('/panel-x7k2')
  redirect('/panel-x7k2')
}

export async function eliminarCatalogo(formData) {
  const supabase = await createClient()
  const id = formData.get('id')
  const rutaPdf = formData.get('ruta_pdf')
  const rutaMiniatura = formData.get('ruta_miniatura')

  await supabase.storage.from('pdfs').remove([rutaPdf])
  await supabase.storage.from('miniaturas').remove([rutaMiniatura])
  await supabase.from('catalogos').delete().eq('id', id)

  revalidatePath('/')
  revalidatePath('/panel-x7k2')
}

export async function cerrarSesion() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/panel-x7k2/login')
}
