import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EmployeeService from '../../../api/EmployeeService';
import Button from '../../../components/Button';
import FormikTickbox from '../../../components/Form/FormikTickbox';
import ImageUploadForm from '../../../components/ImageUploadForm';

const $el = document.getElementById('employees-signature');
const employeeId = $el.getAttribute('data-employee-id');

class EmployeesSignature extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUploading: false,
      cardSourceCode: '',
      isEmployeeDataReceived: false,
      isAbbreviatedLastName: false,
      employee: {},
    };

    this.messages = {
      loadError: 'Unable to load employee information',
      loading: 'Loading employee information...',
      copied: 'Signature code copied to clipboard',
      avatarUploaded: 'Employee avatar picture has been uploaded',
      uploadError: "Couldn't upload avatar",
    };

    this.employeeService = new EmployeeService();

    this.handleAvatarUpload = this.handleAvatarUpload.bind(this);
    this.updateCardSourceCode = this.updateCardSourceCode.bind(this);
    this.getSignature = this.getSignature.bind(this);
  }

  componentDidMount() {
    this.employeeService
      .getEmployeeProfile(employeeId)
      .then((json) => {
        this.setState({
          employee: json.employee,
          isEmployeeDataReceived: true,
        });

        this.updateCardSourceCode();
      })
      .catch(() => {
        // Ignore
      });
  }

  getSourceCode() {
    const { cardSourceCode } = this.state;

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <title>ABM Signature</title>
  </head>
  <body>
    ${cardSourceCode}
  </body>
</html>`;
  }

  getSignature() {
    const { cardSourceCode } = this.state;
    if (!cardSourceCode) {
      return;
    }

    const newWin = window.open('', 'newWindow', 'width=500,height=700');
    newWin.document.write(this.getSourceCode());
    newWin.document.close();
  }

  handleAvatarUpload(payload) {
    this.setState({ isUploading: true });

    return this.employeeService
      .uploadEmployeeAvatar(employeeId, payload)
      .then((json) => {
        this.setState({ employee: json.employee });
      })
      .catch(() => {
        // Ignore
      })
      .finally(() => this.setState({ isUploading: false }));
  }

  updateCardSourceCode() {
    setTimeout(() => {
      this.setState({ cardSourceCode: document.getElementById('signatureCard').innerHTML });
    }, 100);
  }

  render() {
    const address = '6807 NE 79th Court | Portland OR 97218';
    const { employee, isUploading, isAbbreviatedLastName, isEmployeeDataReceived } = this.state;
    const { firstName, lastName, position, officePhone, signatureImg } = employee;

    return (
      <>
        {isEmployeeDataReceived ? (
          <>
            <div className="profile-info--image-upload d-flex" style={{ marginTop: 25 }}>
              <h4 style={{ marginRight: 25 }}>Upload Picture</h4>
              <div style={{ width: 400 }}>
                <ImageUploadForm
                  loading={isUploading}
                  submitOnUpload
                  multipleUpload={false}
                  onSubmit={this.handleAvatarUpload}
                />
              </div>
            </div>
            <div className="employees-signature d-flex" style={{ paddingTop: 20 }}>
              <div className="d-flex">
                <h4 style={{ marginRight: 70 }}>Preview</h4>

                <div className="d-flex fd-col">
                  <div id="signatureCard">
                    <table
                      cellPadding={0}
                      cellSpacing={0}
                      style={{
                        margin: 0,
                        backgroundColor: 'white',
                        padding: '12px 15px',
                        width: '340px',
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              padding: '0',
                              height: '1px',
                              background: 'linear-gradient(270.12deg, #2DDCE8 0%, #1D84FE 100%), #23a5f6',
                              backgroundColor: '#23a5f6',
                            }}
                          />
                        </tr>
                        <tr>
                          <td
                            style={{
                              padding: '14px 0 9px',
                            }}
                          >
                            <style
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{
                                __html: '\n*{\nfont-family: Arial, sans-serif;\n}\n',
                              }}
                            />
                            <table style={{ borderCollapse: 'collapse' }} cellPadding={0} cellSpacing={0}>
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      verticalAlign: 'top',
                                      width: '36px',
                                      height: '36px',
                                      paddingRight: signatureImg ? '14px' : '0',
                                    }}
                                  >
                                    {signatureImg && (
                                      <img
                                        style={{
                                          fontSize: '7px !important',
                                          display: 'block',
                                          width: '36px',
                                          height: '36px',
                                        }}
                                        width={36}
                                        height={36}
                                        src={signatureImg}
                                        alt={`${firstName} ${lastName}`}
                                      />
                                    )}
                                  </td>
                                  <td style={{ width: '100%' }}>
                                    <table
                                      style={{ padding: 0, margin: 0, width: '100%' }}
                                      cellPadding={0}
                                      cellSpacing={0}
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style={{
                                              fontFamily: 'Arial, sans-serif',
                                              verticalAlign: 'middle',
                                              color: '#000',
                                              fontSize: '16px',
                                              lineHeight: 1,
                                              fontWeight: 'bold',
                                              paddingBottom: '3px',
                                            }}
                                          >
                                            {firstName} {isAbbreviatedLastName ? `${lastName.charAt(0)}.` : lastName}
                                          </td>
                                          <td align="right">
                                            <img
                                              width={92}
                                              height={24}
                                              src="https://www.autobidmaster.com/signatures/images/logo.png"
                                              alt="AutoBidMaster logo"
                                              style={{
                                                fontSize: '9px !important',
                                                width: '92px',
                                                height: '24px',
                                                display: 'block',
                                                position: 'relative',
                                                top: '3px',
                                              }}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            style={{
                                              fontFamily: 'Arial, sans-serif',
                                              color: '#999',
                                              fontSize: '12px',
                                              lineHeight: 1,
                                              paddingBottom: '9px',
                                            }}
                                          >
                                            {position}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            colSpan={2}
                                            style={{
                                              fontFamily: 'Arial, sans-serif',
                                              color: '#000',
                                              fontSize: '0px',
                                              lineHeight: 1,
                                              borderTop: '1px solid #f3f3f3',
                                              paddingBottom: '9px',
                                            }}
                                          >
                                            &nbsp;
                                          </td>
                                        </tr>
                                        <tr>
                                          <td colSpan={2}>
                                            <table
                                              style={{
                                                padding: 0,
                                                margin: 0,
                                              }}
                                              cellPadding={0}
                                              cellSpacing={0}
                                            >
                                              <tbody>
                                                {officePhone && (
                                                  <tr>
                                                    <td
                                                      style={{
                                                        fontFamily: 'Arial, sans-serif',
                                                        color: '#999',
                                                        fontSize: '10px',
                                                        lineHeight: '1.4',
                                                        paddingRight: '6px',
                                                      }}
                                                    >
                                                      Phone:
                                                    </td>
                                                    <td
                                                      style={{
                                                        fontFamily: 'Arial, sans-serif',
                                                        color: '#000',
                                                        fontSize: '10px',
                                                        lineHeight: '1.4',
                                                      }}
                                                    >
                                                      {officePhone}
                                                    </td>
                                                  </tr>
                                                )}
                                                {address && (
                                                  <tr>
                                                    <td
                                                      style={{
                                                        fontFamily: 'Arial, sans-serif',
                                                        color: '#999',
                                                        fontSize: '10px',
                                                        lineHeight: '1.4',
                                                        paddingRight: '6px',
                                                      }}
                                                    >
                                                      Address:
                                                    </td>
                                                    <td
                                                      style={{
                                                        fontFamily: 'Arial, sans-serif',
                                                        color: '#000',
                                                        fontSize: '10px',
                                                        lineHeight: '1.4',
                                                      }}
                                                    >
                                                      {address}
                                                    </td>
                                                  </tr>
                                                )}
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex ai-fe jc-sb" style={{ marginTop: 15 }}>
                    <FormikTickbox
                      id="isAbbreviatedLastName"
                      name="isAbbreviatedLastName"
                      value={isAbbreviatedLastName}
                      onChange={(name, value) => {
                        this.setState({ [name]: value });
                        this.updateCardSourceCode();
                      }}
                    >
                      Abbreviate last name
                    </FormikTickbox>

                    <Button label="Get Signature" className="btn-primary" onClick={this.getSignature} />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h4 style={{ paddingTop: 20 }}>{this.messages.loading}</h4>
        )}
      </>
    );
  }
}

ReactDOM.render(<EmployeesSignature />, $el);
