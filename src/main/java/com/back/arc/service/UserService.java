package com.back.arc.service;

import com.back.arc.auth.AuthenticationRequest;
import com.back.arc.entities.Role;
import com.back.arc.entities.User;
import com.back.arc.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;
    public void changePassword(AuthenticationRequest.ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        repository.save(user);
    }
    public String storeProfileImage(MultipartFile profileImage) throws IOException {
        String imagePath = null;
        String path ="";
        if (profileImage != null && !profileImage.isEmpty()) {
            String fileName = StringUtils.cleanPath(profileImage.getOriginalFilename());
            String currentDir = System.getProperty("user.dir");
            Path uploadDir = Paths.get(currentDir, "webpack", "arcfront", "src","assets","img", "user-profiles");
            Path storeDir = Paths.get("img","user-profiles",fileName);
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
            try (InputStream inputStream = profileImage.getInputStream()) {
                Path filePath = uploadDir.resolve(fileName);
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
                imagePath = filePath.toAbsolutePath().toString();
                path= storeDir.toString();
            } catch (IOException ex) {
                throw new IOException("Could not store file " + fileName + ". Please try again!", ex);
            }
        }
       return path;
    }
public User addUser(String username, String email, String password, String phone, Role role, MultipartFile file) throws IOException {
        User user = new User();
        user.setUsernamee(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setPhone(phone);
        user.setRole(role);
        if(file!=null){
            String path = storeProfileImage(file);
            user.setProfileImagePath(path);
        }
    repository.save(user);
        return user;
}
public List<User> getAll(){
        return repository.findAll();
}
public void delete (int id){
      User user =  repository.findById(id).orElse(null);
     repository.delete(user);
}
public User update(int id,String username, String email, String password, String phone, Role role, MultipartFile file) throws IOException {
        User user = repository.findById(id).orElse(null);
        if (username!=null){
            user.setUsernamee(username);
        }
        if (email!=null){
            user.setEmail(email);
        }
        if (password!=null){
            user.setPassword(passwordEncoder.encode(password));
        }
        if (phone!=null){
            user.setPhone(phone);
        }
        if (role!=null){
            user.setRole(role);
        }
    if(file!=null){
        String path = storeProfileImage(file);
        user.setProfileImagePath(path);
    }
    repository.save(user);
    return user;
}
public User findbyemail(String email)
{
    return repository.findByEmail(email).orElse(null);
}
}
