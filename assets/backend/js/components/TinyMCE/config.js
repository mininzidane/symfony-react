export default {
  apiKey: 'u0p56ppa9ulr4jggeft7qt82cxpfve4vxgxzztakzg2ng3wo',
  config: {
    height: 500,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen image imagetools',
      'insertdatetime media table paste code help wordcount',
      'anchor link code',
    ],
    toolbar:
      'undo redo | image link | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    file_picker_types: 'image',
    image_uploadtab: true,
    image_advtab: true,
    images_upload_url: '/abm-acp/api/v1/dynamic-pages/upload-image',
    image_class_list: [{ title: 'None', value: '' }],
    valid_children: '+body[style]',
    convert_urls: false,
  },
};
