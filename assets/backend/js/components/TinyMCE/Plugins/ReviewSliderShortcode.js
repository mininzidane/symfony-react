export default function ReviewSliderShortcode(mceEditor) {
  mceEditor.editorManager.PluginManager.add('reviewSliderShortcode', (editor) => {
    const openDialog = () =>
      editor.windowManager.open({
        title: 'Review Slider Shortcode',
        body: {
          type: 'panel',
          items: [
            {
              type: 'input',
              name: 'class',
              label: 'Class',
            },
            {
              type: 'input',
              name: 'cnt',
              label: 'Reviews Cnt',
            },
          ],
        },
        buttons: [
          {
            type: 'cancel',
            text: 'Close',
          },
          {
            type: 'submit',
            text: 'Save',
            primary: true,
          },
        ],
        onSubmit: (api) => {
          const data = api.getData();
          const { class: registrationClass, cnt = 5 } = data;
          editor.insertContent(`[ReviewSliderBlock class="${registrationClass}" cnt="${cnt}" /]`);
          api.close();
        },
      });

    editor.ui.registry.addButton('reviewSliderShortcode', {
      icon: 'gallery',
      onAction: () => {
        openDialog();
      },
    });

    editor.ui.registry.addMenuItem('reviewSliderShortcode', {
      text: 'Reg Blk',
      onAction: () => {
        openDialog();
      },
    });
  });
}
