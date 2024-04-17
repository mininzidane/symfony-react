export default function registrationShortcode(mceEditor) {
  mceEditor.editorManager.PluginManager.add('registrationShortcode', (editor) => {
    const openDialog = () =>
      editor.windowManager.open({
        title: 'Registration Shortcode',
        body: {
          type: 'panel',
          items: [
            {
              type: 'input',
              name: 'class',
              label: 'Class',
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
          editor.insertContent(`[RegistrationBlock class="${data.class}" /]`);
          api.close();
        },
      });

    editor.ui.registry.addButton('registrationShortcode', {
      icon: 'user',
      onAction: () => {
        openDialog();
      },
    });

    editor.ui.registry.addMenuItem('registrationShortcode', {
      text: 'Reg Blk',
      onAction: () => {
        openDialog();
      },
    });
  });
}
