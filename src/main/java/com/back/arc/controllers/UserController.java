package com.back.arc.controllers;

import com.back.arc.auth.AuthenticationRequest;
import com.back.arc.entities.Role;
import com.back.arc.entities.User;
import com.back.arc.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PatchMapping("/changepass")
    public ResponseEntity<?> changePassword(
          @RequestBody AuthenticationRequest.ChangePasswordRequest request,
          Principal connectedUser
    ) {
        service.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/upload")
    public String storeProfileImage(MultipartFile profileImage) throws IOException {
        return service.storeProfileImage(profileImage);
    }

    @PostMapping("/add")
    public ResponseEntity<User> add(@RequestParam("username") String username,
                                                   @RequestParam("email") String email,
                                                   @RequestParam("password") String password,
                                                   @RequestParam("phone") String phone,
                                                   @RequestParam("role") Role role,
                                                   @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        User utilisateurAjoute = service.addUser(username, email, password, phone, role, file);

        return new ResponseEntity<>(utilisateurAjoute, HttpStatus.CREATED);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<User> update(@PathVariable int id ,
                                       @RequestParam(value="username", required = false) String username,
                                      @RequestParam(value= "email", required = false) String email,
                                       @RequestParam(value="password", required = false) String password,
                                      @RequestParam(value= "phone", required = false) String phone,
                                      @RequestParam(value= "role", required = false) Role role,
                                     @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        User user = service.update(id,username, email, password, phone, role, file);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/getall")
    public List<User> getusers(){
       return service.getAll();
}
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) throws IOException{
        service.delete(id);

    }


}
