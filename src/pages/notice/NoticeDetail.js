import NoticeDetailCSS from './NoticeDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import{
    callNoticeDetailAPI,
    callNoticeUpdateAPI
} from '../../apis/NoticeAPICalls'

function NoticeDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const notice  = useSelector(state => state.noticeReducer);  
    const noticeDetail = notice.data
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   

    const [modifyMode, setModifyMode] = useState(false);    
    const [form, setForm] = useState({});

    useEffect(        
        () => {
            console.log('[NoticeDetail] NotNo : ', params.notNo);

            dispatch(callNoticeDetailAPI({	
                notNo: params.notNo
            }));            
        }
        ,[]
    );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            notNo: noticeDetail.notNo,
            notTitle: noticeDetail.notTitle,
            notContent: noticeDetail.notContent
        });
    }

    const onClickNoticeUpdateHandler = () => {        

        dispatch(callNoticeUpdateAPI({	
            form: form
        }));         

        navigate(`/employee/${noticeDetail.employee.employee}`, { replace: true});
        window.location.reload();
    }    


    return (
        <>
            { noticeDetail &&
            <div className={ NoticeDetailCSS.reviewDetailtableDiv }>
                <table className={ NoticeDetailCSS.reviewDetailtableCss }>
                <colgroup>
                        <col width="20%" />
                        <col width="80%" />
                    </colgroup>
                    <tbody>            
                        <tr>
                            <th>제목</th>
                            <td>
                                <input 
                                    className={ NoticeDetailCSS.ReviewDetailInput }
                                    name='notTitle'
                                    placeholder='제목'
                                    readOnly={modifyMode ? false : true}
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? noticeDetail.noticeTitle : form.notTitle) || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>
                                <input 
                                    className={ NoticeDetailCSS.ReviewDetailInput }
                                    placeholder='작성자'
                                    readOnly={true}
                                    style={ { backgroundColor: 'gray'} }
                                    value={ noticeDetail && noticeDetail.reviewer?.memberName || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>작성일</th>
                            <td>
                                <input 
                                    className={ NoticeDetailCSS.ReviewDetailInput }
                                    placeholder='작성일'
                                    readOnly={true}
                                    style={ { backgroundColor: 'gray'} }
                                    value={ noticeDetail && noticeDetail.reviewCreateDate || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <textarea
                                    name='reviewContent'
                                    className={ NoticeDetailCSS.contentTextArea }
                                    readOnly={modifyMode ? false : true}
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? noticeDetail.notContent : form.notContent) || ''}
                                >                                    
                                </textarea>
                            </td>
                        </tr>
                    </tbody>                    
                </table>            
            </div>
            }
            { noticeDetail && 
                <div className={ NoticeDetailCSS.buttonDivCss }>
                    <button
                        className={ NoticeDetailCSS.backBtn }
                        onClick={ () => navigate(-1) }
                    >
                        돌아가기
                    </button>
                    
                    { token &&
                        (token.sub === noticeDetail.reviewer?.memberId) 
                        ?                 
                            <div>{!modifyMode &&
                                <button       
                                    className={ NoticeDetailCSS.backBtn }
                                    onClick={ onClickModifyModeHandler }             
                                >
                                    수정모드
                                </button>
                            }
                            {modifyMode &&
                                <button       
                                    className={ NoticeDetailCSS.backBtn }
                                    onClick={ onClickNoticeUpdateHandler }             
                                >
                                    공지 수정 저장하기
                                </button>
                            }
                            </div>
                        : null
                    }

                </div>
            }
        </>
    );
}

export default NoticeDetail;
