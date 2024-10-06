import { LanguageChangeModalBox, LanguageChangeModalContainer, LanguageText } from '../Container';

interface LanguageChangeModalProps {
  isLanguageChangeOpen: boolean;
  handleCloseLanguageChange: () => void;
}

const languages = ['English'];

const LanguageChangeModal = ({ isLanguageChangeOpen, handleCloseLanguageChange }: LanguageChangeModalProps) => {
  return (
    <>
      <LanguageChangeModalContainer open={isLanguageChangeOpen} onClose={handleCloseLanguageChange}>
        <LanguageChangeModalBox>
          {languages.map((language, index) => (
            <LanguageText key={index} onClick={handleCloseLanguageChange}>
              {language}
            </LanguageText>
          ))}
        </LanguageChangeModalBox>
      </LanguageChangeModalContainer>
    </>
  );
};
export default LanguageChangeModal;
